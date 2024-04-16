import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Welcome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handlePlaylistsClick = () => {
    navigate('/playlists');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Playlist Manager</h1>
      <nav>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={handlePlaylistsClick}>Playlists</button>
        {!isAuthenticated && (
          <>
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </>
        )}
        {isAuthenticated && (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Welcome;