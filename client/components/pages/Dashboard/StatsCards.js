import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const StatsCards = ({ user, stats, statsLoading }) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', backgroundColor: 'primary.light', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                {user?.role === 'employer' ? 'Posted Jobs' : 'Applied Jobs'}
              </Typography>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <WorkIcon />
              </Avatar>
            </Box>
            {statsLoading ? (
              <LinearProgress color="inherit" sx={{ mb: 1 }} />
            ) : (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {user?.role === 'employer' ? stats.totalJobs : stats.totalApplications}
              </Typography>
            )}
            <Typography variant="body2">
              {user?.role === 'employer' 
                ? `You've posted ${stats.totalJobs} jobs` 
                : `You've applied to ${stats.totalApplications} jobs`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', backgroundColor: 'success.light', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                {user?.role === 'employer' ? 'Applications' : 'Shortlisted'}
              </Typography>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <PersonIcon />
              </Avatar>
            </Box>
            {statsLoading ? (
              <LinearProgress color="inherit" sx={{ mb: 1 }} />
            ) : (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {user?.role === 'employer' ? stats.totalApplications : stats.shortlisted}
              </Typography>
            )}
            <Typography variant="body2">
              {user?.role === 'employer'
                ? `Received ${stats.totalApplications} applications`
                : `You're shortlisted for ${stats.shortlisted} jobs`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', backgroundColor: 'warning.light', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                {user?.role === 'employer' ? 'Shortlisted' : 'Interviews'}
              </Typography>
              <Avatar sx={{ bgcolor: 'warning.main' }}>
                <ScheduleIcon />
              </Avatar>
            </Box>
            {statsLoading ? (
              <LinearProgress color="inherit" sx={{ mb: 1 }} />
            ) : (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {user?.role === 'employer' ? stats.shortlisted : Math.floor(stats.shortlisted * 0.7)}
              </Typography>
            )}
            <Typography variant="body2">
              {user?.role === 'employer'
                ? `${stats.shortlisted} candidates shortlisted`
                : `${Math.floor(stats.shortlisted * 0.7)} upcoming interviews`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%', backgroundColor: 'info.light', color: 'white' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                {user?.role === 'employer' ? 'Hired' : 'Offers'}
              </Typography>
              <Avatar sx={{ bgcolor: 'info.main' }}>
                <CheckCircleIcon />
              </Avatar>
            </Box>
            {statsLoading ? (
              <LinearProgress color="inherit" sx={{ mb: 1 }} />
            ) : (
              <Typography variant="h3" sx={{ mb: 1 }}>
                {stats.accepted}
              </Typography>
            )}
            <Typography variant="body2">
              {user?.role === 'employer'
                ? `${stats.accepted} candidates hired`
                : `You've received ${stats.accepted} job offers`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatsCards; 