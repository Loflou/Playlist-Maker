import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getPlaylists = async () => {
  const response = await axios.get(`${API_URL}/playlists`);
  return response.data;
};

export const getPlaylistDetails = async (playlistId) => {
  const response = await axios.get(`${API_URL}/playlists/${playlistId}`);
  return response.data;
};

export const createPlaylist = async (playlistData) => {
  const response = await axios.post(`${API_URL}/playlists`, playlistData);
  return response.data;
};

export const updatePlaylist = async (playlistId, playlistData) => {
  const response = await axios.put(`${API_URL}/playlists/${playlistId}`, playlistData);
  return response.data;
};

export const deletePlaylist = async (playlistId) => {
  await axios.delete(`${API_URL}/playlists/${playlistId}`);
};

export const addVideoToPlaylist = async (playlistId, videoId) => {
  const response = await axios.post(`${API_URL}/playlists/${playlistId}/videos`, { video_id: videoId });
  return response.data;
};

export const removeVideoFromPlaylist = async (playlistId, videoId) => {
  await axios.delete(`${API_URL}/playlists/${playlistId}/videos/${videoId}`);
};