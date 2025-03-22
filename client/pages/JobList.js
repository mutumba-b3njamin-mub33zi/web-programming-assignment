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
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchJobs } from '../store/slices/jobSlice';

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobs, loading, error, totalPages } = useSelector((state) => state.jobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchJobs({ page: currentPage, search: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewDetails = (id) => {
    navigate(`/jobs/${id}`);
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
        <Typography variant="h4" component="h1" gutterBottom>
          Find Your Next Job
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search jobs by title, company, or location"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" component="h2" gutterBottom>
                          {job.title}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {job.company}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          {job.location} • {job.type} • ${job.salaryRange.min} - ${job.salaryRange.max}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {job.description.substring(0, 150)}...
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleViewDetails(job._id)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Alert severity="info">
                    No jobs found. Try adjusting your search criteria.
                  </Alert>
                </Grid>
              )}
            </Grid>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default JobList; 