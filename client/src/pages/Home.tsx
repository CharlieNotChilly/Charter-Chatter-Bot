import { Box } from '@mui/material';
import React from 'react';
import TypingAnim from '../components/typer/TypingAnim';

const Home = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box><TypingAnim /></Box>
      </Box>
    </Box>
  );
};

export default Home;
