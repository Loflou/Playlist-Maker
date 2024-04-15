import React from 'react';
import { css } from '@emotion/react';

const Home = () => {
  return (
    <div css={styles.container}>
      <h1>Welcome to YouTube Playlist Manager</h1>
      <p>Manage your YouTube playlists easily!</p>
    </div>
  );
};

const styles = {
  container: css`
    text-align: center;
    padding: 20px;
  `,
};

export default Home;