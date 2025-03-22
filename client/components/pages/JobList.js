import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Pagination,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  InputAdornment
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Search as SearchIcon } from '@mui/icons-material';
import { fetchJobs, fetchCategories, fetchSkills } from '../store/slices/jobSlice';

const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    skill: searchParams.get('skill') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    experience: searchParams.get('experience') || ''
  });

  const { jobs, categories, skills, totalPages, currentPage } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs(searchParams));
    dispatch(fetchCategories());
    dispatch(fetchSkills());
  }, [dispatch, searchParams]);

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    setSearchParams(params);
  };

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', value);
    setSearchParams(params);
  };

  const FilterDrawer = () => (
    <Box sx={{ p: 2, width: isMobile ? '100%' : 300 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Search"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={filters.category}
            label="Category"
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Skill</InputLabel>
          <Select
            value={filters.skill}
            label="Skill"
            onChange={(e) => handleFilterChange('skill', e.target.value)}
          >
            <MenuItem value="">All Skills</MenuItem>
            {skills.map((skill) => (
              <MenuItem key={skill.id} value={skill.id}>
                {skill.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={filters.type}
            label="Job Type"
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="internship">Internship</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Experience Level</InputLabel>
          <Select
            value={filters.experience}
            label="Experience Level"
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="entry">Entry Level</MenuItem>
            <MenuItem value="mid">Mid Level</MenuItem>
            <MenuItem value="senior">Senior Level</MenuItem>
            <MenuItem value="lead">Lead</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find Your Next Job
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs by title, company, or location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Job Listings */}
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <Grid item xs={12} md={6} key={job}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Software Engineer
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Tech Company
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    New York, NY • Full-time • $80,000 - $120,000
                  </Typography>
                  <Typography variant="body2" paragraph>
                    We are looking for an experienced software engineer to join our team...
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/jobs/${job}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobList; 