import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MainPlaylist = () => {
  const { token } = useAuth();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get('/api/playlist', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylist(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch playlist');
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [token]);

  const addSong = async (song) => {
    try {
      await axios.post('/api/playlist/add', song, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        songs: [...prevPlaylist.songs, song],
      }));
    } catch (error) {
      setError('Failed to add song to playlist');
    }
  };

  const removeSong = async (songId) => {
    try {
      await axios.delete(`/api/playlist/remove?song_id=${songId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylist((prevPlaylist) => ({
        ...prevPlaylist,
        songs: prevPlaylist.songs.filter((song) => song.id !== songId),
      }));
    } catch (error) {
      setError('Failed to remove song from playlist');
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedSongs = Array.from(playlist.songs);
    const [reorderedSong] = reorderedSongs.splice(result.source.index, 1);
    reorderedSongs.splice(result.destination.index, 0, reorderedSong);

    try {
      await axios.put('/api/playlist/reorder', reorderedSongs.map((song) => song.id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylist((prevPlaylist) => ({ ...prevPlaylist, songs: reorderedSongs }));
    } catch (error) {
      setError('Failed to reorder playlist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Main Playlist</h2>
      {/* Render the playlist */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {playlist.songs.map((song, index) => (
                <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p>{song.title}</p>
                      <p>{song.artist}</p>
                      <button onClick={() => removeSong(song.id)}>Remove</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Add form or input to add songs */}
    </div>
  );
};

export default MainPlaylist;