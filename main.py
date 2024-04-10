from fastapi import FastAPI, Request, HTTPException
from playlists import get_playlists, create_playlist, update_playlist, delete_playlist
from videos import add_video_to_playlist, remove_video_from_playlist, get_playlist_videos
from auth import authenticate_youtube

app = FastAPI()

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