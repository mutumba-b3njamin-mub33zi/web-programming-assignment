import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
  Stack
} from '@mui/material';
import {
  fetchEmployerJobs,
  fetchJobApplications,
  fetchJobAnalytics
} from '../store/slices/jobSlice';
import { fetchApplicationAnalytics } from '../store/slices/analyticsSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { employerJobs, jobApplications, jobAnalytics, loading } = useSelector(
    (state) => state.jobs
  );
  const { applicationAnalytics } = useSelector((state) => state.analytics);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    if (user?.role === 'employer') {
      dispatch(fetchEmployerJobs());
      dispatch(fetchJobAnalytics());
    } else {
      dispatch(fetchJobApplications());
      dispatch(fetchApplicationAnalytics());
    }
  }, [dispatch, user?.role]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const EmployerDashboard = () => (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Employer Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/post-job')}
        >
          Post New Job
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Analytics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Jobs Posted
              </Typography>
              <Typography variant="h4">
                {jobAnalytics?.total_jobs || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h4">
                {jobAnalytics?.total_applications || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Shortlisted
              </Typography>
              <Typography variant="h4">
                {jobAnalytics?.shortlisted || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Hired
              </Typography>
              <Typography variant="h4">
                {jobAnalytics?.accepted || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Job Listings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Job Listings
              </Typography>
              <List>
                {employerJobs.map((job) => (
                  <React.Fragment key={job.id}>
                    <ListItem>
                      <ListItemText
                        primary={job.title}
                        secondary={`Posted on ${new Date(
                          job.created_at
                        ).toLocaleDateString()}`}
                      />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={1}>
                          <Chip
                            label={`${job.applications_count} applications`}
                            size="small"
                          />
                          <Chip
                            label={job.status}
                            color={job.status === 'active' ? 'success' : 'default'}
                            size="small"
                          />
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const JobSeekerDashboard = () => (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Job Seeker Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Analytics Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h4">
                {applicationAnalytics?.summary?.total_applications || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Shortlisted
              </Typography>
              <Typography variant="h4">
                {applicationAnalytics?.summary?.shortlisted || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Accepted
              </Typography>
              <Typography variant="h4">
                {applicationAnalytics?.summary?.accepted || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h4">
                {applicationAnalytics?.summary?.pending || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Status */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="All Applications" />
                <Tab label="Shortlisted" />
                <Tab label="Accepted" />
                <Tab label="Pending" />
              </Tabs>

              <List sx={{ mt: 2 }}>
                {jobApplications
                  .filter((application) => {
                    if (tabValue === 0) return true;
                    if (tabValue === 1) return application.status === 'shortlisted';
                    if (tabValue === 2) return application.status === 'accepted';
                    if (tabValue === 3) return application.status === 'pending';
                    return true;
                  })
                  .map((application) => (
                    <React.Fragment key={application.id}>
                      <ListItem>
                        <ListItemText
                          primary={application.job.title}
                          secondary={`Applied on ${new Date(
                            application.created_at
                          ).toLocaleDateString()}`}
                        />
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={application.status}
                              color={
                                application.status === 'accepted'
                                  ? 'success'
                                  : application.status === 'shortlisted'
                                  ? 'primary'
                                  : 'default'
                              }
                              size="small"
                            />
                            <Button
                              size="small"
                              onClick={() =>
                                navigate(`/jobs/${application.job.id}`)
                              }
                            >
                              View Job
                            </Button>
                          </Stack>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      {user?.role === 'employer' ? <EmployerDashboard /> : <JobSeekerDashboard />}
    </Container>
  );
};

export default Dashboard; 