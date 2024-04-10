import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PlaylistList from './pages/PlaylistList';
import PlaylistDetails from './pages/PlaylistDetails';
import CreatePlaylist from './pages/CreatePlaylist';
import EditPlaylist from './pages/EditPlaylist';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Playlist Manager</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/playlists">Playlists</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<PlaylistList />} />
          <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
          <Route path="/playlists/create" element={<CreatePlaylist />} />
          <Route path="/playlists/:playlistId/edit" element={<EditPlaylist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;