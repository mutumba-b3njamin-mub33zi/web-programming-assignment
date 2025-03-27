import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Alert,
  Paper
} from '@mui/material';
import { fetchJobs } from '../../store/slices/jobSlice';
import { analyticsService } from '../../services/api';

// Import sub-components
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import EmployerJobListings from './EmployerJobListings';
import JobSeekerApplications from './JobSeekerApplications';

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
  
  // Function to refresh dashboard data
  const refreshDashboardData = async () => {
    // Fetch user's jobs if they're an employer
    if (user?.role === 'employer') {
      dispatch(fetchJobs({ employer: user.id }));
    }
    
    // Fetch dashboard statistics
    fetchDashboardStats();
  };
  
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
      
      // Get real activity data or fall back to mock data
      if (response.recentActivity && response.recentActivity.length > 0) {
        setRecentActivity(response.recentActivity);
      } else {
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
      }
      
      setStatsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setStatsLoading(false);
    }
  };
  
  useEffect(() => {
    // Refresh data when component mounts
    refreshDashboardData();
    
    // Set up a listener for the URL parameters to detect when a job is posted
    const params = new URLSearchParams(window.location.search);
    if (params.get('refresh') === 'true') {
      refreshDashboardData();
      // Clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
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
        
        {/* Stats Cards Component */}
        <StatsCards 
          user={user} 
          stats={stats} 
          statsLoading={statsLoading} 
        />
        
        {/* Main Dashboard Content */}
        <Grid container spacing={4}>
          {/* Recent Activity Component */}
          <Grid item xs={12} md={5}>
            <RecentActivity 
              recentActivity={recentActivity}
              statsLoading={statsLoading}
              refreshDashboardData={refreshDashboardData}
            />
          </Grid>
          
          {/* Role-specific content */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, height: '100%' }}>
              {user?.role === 'employer' ? (
                <EmployerJobListings 
                  jobs={jobs} 
                  loading={loading} 
                />
              ) : (
                <JobSeekerApplications 
                  tabValue={tabValue}
                  handleTabChange={handleTabChange}
                  stats={stats}
                  navigate={navigate}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 