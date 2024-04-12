import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlaylist } from '../api/playlists';
import './CreatePlaylist.css'; // Ensure this CSS file exists and styles the form appropriately

const CreatePlaylist = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlaylist({ title, description, tags: tags.split(',').map(tag => tag.trim()) });
      console.log('Playlist created successfully');
      navigate('/dashboard'); // Adjust the path as needed to redirect to the playlist dashboard
    } catch (error) {
      console.error('Failed to create playlist:', error.message);
    }
  };

  return (
    <div className="createPlaylistContainer">
      <h2>Create New Playlist</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="formGroup">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;