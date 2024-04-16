from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Playlist, Song
from auth import get_current_user

router = APIRouter()

@router.get("/api/playlist")
async def get_main_playlist(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    playlist = db.query(Playlist).filter(Playlist.user_id == current_user.id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return playlist

@router.post("/api/playlist/add")
async def add_song_to_playlist(song: Song, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    playlist = db.query(Playlist).filter(Playlist.user_id == current_user.id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    playlist.songs.append(song)
    db.commit()
    return {"message": "Song added to playlist"}

@router.delete("/api/playlist/remove")
async def remove_song_from_playlist(song_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    playlist = db.query(Playlist).filter(Playlist.user_id == current_user.id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    song = db.query(Song).filter(Song.id == song_id, Song.playlist_id == playlist.id).first()
    if not song:
        raise HTTPException(status_code=404, detail="Song not found in playlist")
    db.delete(song)
    db.commit()
    return {"message": "Song removed from playlist"}

@router.put("/api/playlist/reorder")
async def reorder_playlist(song_ids: List[int], db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    playlist = db.query(Playlist).filter(Playlist.user_id == current_user.id).first()
    if not playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    songs = db.query(Song).filter(Song.id.in_(song_ids), Song.playlist_id == playlist.id).all()
    playlist.songs = songs
    db.commit()
    return {"message": "Playlist reordered"}