import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPlaylist = () => {
  const [playlistDetails, setPlaylistDetails] = useState({
    title: '',
    description: '',
    tags: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylistDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the backend API endpoint for updating a playlist is "/api/playlists/update"
      const response = await axios.put('/api/playlists/update', playlistDetails);
      console.log('Playlist updated successfully:', response.data);
      navigate('/dashboard'); // Redirect to the dashboard after successful update
    } catch (error) {
      console.error('Error updating playlist:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Edit Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={playlistDetails.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={playlistDetails.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={playlistDetails.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Playlist</button>
      </form>
    </div>
  );
};

export default EditPlaylist;