import React from 'react';
import {
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  CircularProgress,
  Chip
} from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmployerJobListings = ({ jobs, loading }) => {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Your Job Listings
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <CircularProgress sx={{ display: 'block', m: 'auto', my: 4 }} />
      ) : jobs && jobs.length > 0 ? (
        <List sx={{ width: '100%' }}>
          {jobs.map((job) => (
            <ListItem 
              key={job._id} 
              sx={{ 
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 1, 
                mb: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: 2,
                  cursor: 'pointer'
                }
              }}
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1">{job.title}</Typography>
                    <Chip 
                      label={job.status || 'Active'} 
                      size="small" 
                      color={job.status === 'closed' ? 'default' : 'success'} 
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      {job.location} • {job.type}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      {job.applications ? `${job.applications.length} applications` : 'No applications yet'}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" gutterBottom>
            You haven't posted any jobs yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/post-job')}
            sx={{ mt: 2 }}
          >
            Post Your First Job
          </Button>
        </Box>
      )}
    </>
  );
};

export default EmployerJobListings; 