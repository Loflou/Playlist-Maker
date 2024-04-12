from fastapi import FastAPI, Request, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
import os

from playlists import get_playlists, create_playlist, update_playlist, delete_playlist
from videos import add_video_to_playlist, remove_video_from_playlist, get_playlist_videos
from auth import authenticate_youtube
from models import User, SessionLocal, engine, Base
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Database
Base.metadata.create_all(bind=engine)

# Authentication
SECRET_KEY = os.getenv("SECRET_KEY")  # INPUT_REQUIRED {config_description: "your_secret_key"}
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/register")
async def register_user(username: str, email: str, password: str, db: Session = Depends(get_db)):
    db_user = get_user(db, username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = get_password_hash(password)
    new_user = User(username=username, email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    return {"msg": "User created successfully"}

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Existing YouTube playlist management endpoints below

@app.get("/playlists")
async def list_playlists():
    youtube = authenticate_youtube()
    playlists = get_playlists(youtube)
    return {"playlists": playlists}

@app.post("/playlists")
async def create_new_playlist(request: Request):
    data = await request.json()
    title = data.get("title")
    description = data.get("description")
    tags = data.get("tags", [])
    
    if not title:
        raise HTTPException(status_code=400, detail="Title is required")
    
    youtube = authenticate_youtube()
    new_playlist = create_playlist(youtube, title, description, tags)
    
    if new_playlist:
        return {"playlist": new_playlist}
    else:
        raise HTTPException(status_code=500, detail="Failed to create playlist")

@app.put("/playlists/{playlist_id}")
async def update_playlist_endpoint(playlist_id: str, request: Request):
    data = await request.json()
    title = data.get("title")
    description = data.get("description")
    tags = data.get("tags", [])
    
    youtube = authenticate_youtube()
    updated_playlist = update_playlist(youtube, playlist_id, title, description, tags)
    
    if updated_playlist:
        return {"playlist": updated_playlist}
    else:
        raise HTTPException(status_code=404, detail="Playlist not found")

@app.delete("/playlists/{playlist_id}")
async def delete_playlist_endpoint(playlist_id: str):
    youtube = authenticate_youtube()
    success = delete_playlist(youtube, playlist_id)
    
    if success:
        return {"message": "Playlist deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Playlist not found")

@app.post("/playlists/{playlist_id}/videos")
async def add_video_to_playlist_endpoint(playlist_id: str, request: Request):
    data = await request.json()
    video_id = data.get("video_id")
    
    if not video_id:
        raise HTTPException(status_code=400, detail="Video ID is required")
    
    youtube = authenticate_youtube()
    success = add_video_to_playlist(youtube, playlist_id, video_id)
    
    if success:
        return {"message": "Video added to playlist successfully"}
    else:
        raise HTTPException(status_code=404, detail="Playlist not found")

@app.delete("/playlists/{playlist_id}/videos/{video_id}")
async def remove_video_from_playlist_endpoint(playlist_id: str, video_id: str):
    youtube = authenticate_youtube()
    success = remove_video_from_playlist(youtube, playlist_id, video_id)
    
    if success:
        return {"message": "Video removed from playlist successfully"}
    else:
        raise HTTPException(status_code=404, detail="Playlist or video not found")

@app.get("/playlists/{playlist_id}/videos")
async def get_playlist_videos_endpoint(playlist_id: str):
    youtube = authenticate_youtube()
    videos = get_playlist_videos(youtube, playlist_id)
    
    if videos is not None:
        return {"videos": videos}
    else:
        raise HTTPException(status_code=404, detail="Playlist not found")