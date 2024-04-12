import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlaylistDetails, removeVideoFromPlaylist } from '../api/playlists';
import './PlaylistDetails.css';

function PlaylistDetails() {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const data = await getPlaylistDetails(playlistId);
        setPlaylist(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch playlist details:', error);
        setError('Failed to fetch playlist details');
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [playlistId]);

  const handleRemoveVideo = async (videoId) => {
    try {
      await removeVideoFromPlaylist(playlistId, videoId);
      setPlaylist(prevPlaylist => ({
        ...prevPlaylist,
        videos: prevPlaylist.videos.filter(v => v.id !== videoId),
      }));
    } catch (error) {
      console.error('Failed to remove video from playlist:', error);
      setError('Failed to remove video from playlist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{playlist.title}</h2>
      <p>{playlist.description}</p>
      <div>
        Tags: {playlist.tags?.join(', ')}
      </div>
      <h3>Videos</h3>
      <ul>
        {playlist.videos?.map(video => (
          <li key={video.id}>
            {video.title}
            <button onClick={() => handleRemoveVideo(video.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to={`/playlists/${playlistId}/videos/add`}>Add Video</Link>
      <Link to={`/playlists/${playlistId}/edit`}>Edit Playlist Details</Link>
    </div>
  );
}

export default PlaylistDetails;