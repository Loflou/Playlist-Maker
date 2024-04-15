import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPlaylists, deletePlaylist } from '../api/playlists';
import './PlaylistList.css';

function PlaylistList() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch playlists');
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await deletePlaylist(playlistId);
      setPlaylists(playlists.filter(p => p.id !== playlistId));
    } catch (error) {
      setError('Failed to delete playlist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (playlists.length === 0) {
    return <div>No playlists found.</div>;
  }

  return (
    <div>
      <h2>Playlists</h2>
      <Link to="/playlists/create">Create New Playlist</Link>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>
            <Link to={`/playlists/${playlist.id}`}>{playlist.title}</Link>
            <Link to={`/playlists/${playlist.id}/edit`}>Edit</Link>
            <button onClick={() => handleDeletePlaylist(playlist.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistList;