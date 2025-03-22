import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  LocationOn,
  Work,
  AttachMoney,
  Business,
  Description
} from '@mui/icons-material';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Job Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Senior Software Engineer
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Tech Company
            </Typography>
            
            <List>
              <ListItem>
                <ListItemIcon>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText primary="New York, NY" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Full-time" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AttachMoney />
                </ListItemIcon>
                <ListItemText primary="$100,000 - $150,000" />
              </ListItem>
            </List>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography paragraph>
              We are looking for an experienced software engineer to join our team. The ideal candidate will have strong experience with React, Node.js, and cloud technologies.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Requirements
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="• 5+ years of experience in software development" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Strong knowledge of React and Node.js" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Experience with cloud platforms (AWS, Azure, or GCP)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="• Excellent problem-solving and communication skills" />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Company Info & Apply Button */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              About the Company
            </Typography>
            <Typography paragraph>
              Tech Company is a leading technology firm specializing in innovative solutions for businesses worldwide.
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => navigate('/apply')}
            >
              Apply Now
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobDetails; 