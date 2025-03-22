import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import {
  LocationOn,
  Work,
  AttachMoney,
  School,
  AccessTime,
  Business,
  Description,
  CheckCircle,
  Close,
  Schedule
} from '@mui/icons-material';
import { fetchJobDetails, fetchRelatedJobs } from '../store/slices/jobSlice';
import { createApplication } from '../store/slices/applicationSlice';
import { trackJobView } from '../store/slices/analyticsSlice';

const JobDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { jobDetails, relatedJobs, loading, error } = useSelector((state) => state.jobs);
  const [applicationDialog, setApplicationDialog] = useState(false);
  const [applicationData, setApplicationData] = useState({
    cover_letter: '',
    resume_url: ''
  });

  useEffect(() => {
    dispatch(fetchJobDetails(id));
    dispatch(fetchRelatedJobs(id));
    dispatch(trackJobView(id));
  }, [dispatch, id]);

  const handleApply = async () => {
    try {
      await dispatch(createApplication({ job_id: id, ...applicationData })).unwrap();
      setApplicationDialog(false);
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the application slice
    }
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

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!jobDetails) {
    return null;
  }

  const isEmployer = user?.role === 'employer';
  const hasApplied = jobDetails.applications?.some(
    (app) => app.user_id === user?.id
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {/* Job Details */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {jobDetails.title}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {jobDetails.company_name}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip
                  icon={<LocationOn />}
                  label={jobDetails.location}
                  size="small"
                />
                <Chip
                  icon={<Work />}
                  label={jobDetails.type}
                  size="small"
                />
                <Chip
                  icon={<AttachMoney />}
                  label={`$${jobDetails.salary_range}`}
                  size="small"
                />
                <Chip
                  icon={<School />}
                  label={jobDetails.experience_level}
                  size="small"
                />
              </Stack>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
      <Grid container spacing={3}>
        {/* Job Details */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  {jobDetails.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {jobDetails.company_name}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    icon={<LocationOn />}
                    label={jobDetails.location}
                    size="small"
                  />
                  <Chip
                    icon={<Work />}
                    label={jobDetails.type}
                    size="small"
                  />
                  <Chip
                    icon={<AttachMoney />}
                    label={`$${jobDetails.salary_range}`}
                    size="small"
                  />
                  <Chip
                    icon={<School />}
                    label={jobDetails.experience_level}
                    size="small"
                  />
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Job Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {jobDetails.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Requirements
                </Typography>
                <Typography variant="body1" paragraph>
                  {jobDetails.requirements}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Required Skills
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {jobDetails.skills.map((skill) => (
                    <Chip
                      key={skill.id}
                      label={skill.name}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Job Actions and Company Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Business />
                  </ListItemIcon>
                  <ListItemText
                    primary="Company"
                    secondary={jobDetails.company_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Location"
                    secondary={jobDetails.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Work />
                  </ListItemIcon>
                  <ListItemText
                    primary="Job Type"
                    secondary={jobDetails.type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoney />
                  </ListItemIcon>
                  <ListItemText
                    primary="Salary"
                    secondary={`$${jobDetails.salary_range}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText
                    primary="Experience"
                    secondary={jobDetails.experience_level}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime />
                  </ListItemIcon>
                  <ListItemText
                    primary="Posted"
                    secondary={new Date(jobDetails.created_at).toLocaleDateString()}
                  />
                </ListItem>
              </List>

              {!isEmployer && !hasApplied && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setApplicationDialog(true)}
                >
                  Apply Now
                </Button>
              )}

              {hasApplied && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  You have already applied for this job
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Similar Jobs
                </Typography>
                <List>
                  {relatedJobs.map((job) => (
                    <ListItem
                      key={job.id}
                      button
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <ListItemText
                        primary={job.title}
                        secondary={job.company_name}
                      />
                      <ListItemIcon>
                        <Tooltip title="View Details">
                          <IconButton size="small">
                            <Description />
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Application Dialog */}
      <Dialog
        open={applicationDialog}
        onClose={() => setApplicationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Apply for {jobDetails.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Cover Letter"
              multiline
              rows={4}
              value={applicationData.cover_letter}
              onChange={(e) =>
                setApplicationData({ ...applicationData, cover_letter: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Resume URL"
              value={applicationData.resume_url}
              onChange={(e) =>
                setApplicationData({ ...applicationData, resume_url: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplicationDialog(false)}>Cancel</Button>
          <Button onClick={handleApply} variant="contained">
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetails; 