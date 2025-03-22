import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Find Your Dream Job
              </Typography>
              <Typography variant="h5" gutterBottom>
                Connect with top employers and opportunities
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/jobs')}
                  sx={{ mr: 2 }}
                >
                  Browse Jobs
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Jobs Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Jobs
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((job) => (
            <Grid item xs={12} md={4} key={job}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Software Engineer
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Tech Company
                  </Typography>
                  <Typography variant="body2">
                    Full-time • $80,000 - $120,000
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/jobs/${job}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 