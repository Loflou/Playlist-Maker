import React from 'react';
import { useAuth } from './AuthContext';
import MainPlaylist from './MainPlaylist';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}!</p>
      <MainPlaylist />
    </div>
  );
};

export default Dashboard;