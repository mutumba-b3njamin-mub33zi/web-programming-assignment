import React from 'react';
import {
  Paper,
  Typography,
  Divider,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  CircularProgress
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { formatDate } from './utils';

const RecentActivity = ({ recentActivity, statsLoading, refreshDashboardData }) => {
  // Activity icon based on type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'application':
        return <PersonIcon />;
      case 'job':
        return <WorkIcon />;
      case 'status':
        return <CheckCircleIcon />;
      case 'message':
        return <BusinessIcon />;
      default:
        return <ScheduleIcon />;
    }
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Recent Activity
        </Typography>
        <Button 
          size="small" 
          onClick={refreshDashboardData}
          disabled={statsLoading}
        >
          Refresh
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />
      {statsLoading ? (
        <CircularProgress sx={{ display: 'block', m: 'auto', my: 4 }} />
      ) : (
        <List sx={{ width: '100%' }}>
          {recentActivity.map((activity) => (
            <ListItem key={activity.id} alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.title}
                secondary={
                  <>
                    {activity.description}
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'block' }}
                    >
                      {formatDate(activity.date)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default RecentActivity; 