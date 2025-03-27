import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Chip
} from '@mui/material';
import { Work as WorkIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JobSeekerApplications = ({ tabValue, handleTabChange, stats, navigate }) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Applied Jobs" />
          <Tab label="Saved Jobs" />
        </Tabs>
      </Box>
      
      {tabValue === 0 ? (
        stats.totalApplications > 0 ? (
          <List sx={{ width: '100%' }}>
            {/* Mock job applications data */}
            {[1, 2, 3].map((item) => (
              <ListItem 
                key={item}
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
                onClick={() => navigate(`/jobs/${item}`)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item === 1 ? 'success.main' : 'primary.main' }}>
                    {item === 1 ? <CheckCircleIcon /> : <WorkIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">
                        {['Senior Developer', 'UX Designer', 'Project Manager'][item - 1]}
                      </Typography>
                      <Chip 
                        label={['Shortlisted', 'Applied', 'Under Review'][item - 1]} 
                        size="small" 
                        color={['success', 'primary', 'warning'][item - 1]} 
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {['TechCorp', 'Design Studio', 'InnovateSoft'][item - 1]}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: 'block' }}
                      >
                        Applied {[5, 10, 14][item - 1]} days ago
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
              You haven't applied to any jobs yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/jobs')}
              sx={{ mt: 2 }}
            >
              Browse Jobs
            </Button>
          </Box>
        )
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" gutterBottom>
            You don't have any saved jobs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs')}
            sx={{ mt: 2 }}
          >
            Browse Jobs
          </Button>
        </Box>
      )}
    </>
  );
};

export default JobSeekerApplications; 