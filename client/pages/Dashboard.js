import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Icon,
  Tabs,
  Tab,
  LinearProgress
} from '@mui/material';
import {
  Business as BusinessIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  DateRange as DateRangeIcon,
  BarChart as BarChartIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import { fetchJobs } from '../store/slices/jobSlice';
import { authService, jobService, applicationService, analyticsService } from '../services/api';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    accepted: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch user's jobs if they're an employer
    if (user?.role === 'employer') {
      dispatch(fetchJobs({ employer: user.id }));
    }
    
    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
      try {
        setStatsLoading(true);
        const response = await analyticsService.getDashboardStats();
        setStats({
          totalJobs: response.totalJobs || 0,
          totalApplications: response.totalApplications || 0,
          shortlisted: response.shortlisted || 0,
          accepted: response.accepted || 0
        });
        
        // Mock recent activity data
        setRecentActivity([
          {
            id: 1,
            type: 'application',
            title: 'New application received',
            description: 'John Doe applied for Senior Developer position',
            date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
          },
          {
            id: 2,
            type: 'job',
            title: 'New job posted',
            description: 'You posted a new UX Designer job',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
          },
          {
            id: 3,
            type: 'status',
            title: 'Application status updated',
            description: 'You were shortlisted for Frontend Developer position',
            date: new Date(Date.now() - 1000 * 60 * 60 * 36) // 1.5 days ago
          },
          {
            id: 4,
            type: 'message',
            title: 'New message received',
            description: 'HR from TechCorp sent you a message',
            date: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
          }
        ]);
        
        setStatsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStatsLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, [dispatch, user]);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }
  
  // Helper function to format date
  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHrs < 1) {
      return 'Just now';
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  };
  
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
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          {user?.role === 'employer' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/post-job')}
            >
              Post New Job
            </Button>
          )}
        </Box>
        
        <Typography variant="h6" sx={{ mb: 2 }}>
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        
        {/* Stats Cards */}
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
        
        {/* Main Dashboard Content */}
        <Grid container spacing={4}>
          {/* Recent Activity */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
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
          </Grid>
          
          {/* Role-specific content */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, height: '100%' }}>
              {user?.role === 'employer' ? (
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
              ) : (
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
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 