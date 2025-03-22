import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Navbar />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout; 