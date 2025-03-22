import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  console.log("Layout rendering with children:", children);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: { xs: 2, sm: 3 },
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)', // Subtract navbar height
          pt: '64px',  // Add padding for navbar
        }}
      >
        <Container maxWidth="lg">
          {children || <div>No content to display</div>}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 