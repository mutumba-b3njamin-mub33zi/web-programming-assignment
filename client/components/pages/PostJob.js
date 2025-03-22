import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Stack
} from '@mui/material';
import { createJob } from '../store/slices/jobSlice';
import { fetchCategories, fetchSkills } from '../store/slices/jobSlice';

const validationSchema = Yup.object({
  title: Yup.string().required('Job title is required'),
  description: Yup.string().required('Job description is required'),
  requirements: Yup.string().required('Job requirements are required'),
  category_id: Yup.string().required('Category is required'),
  location: Yup.string().required('Location is required'),
  type: Yup.string().required('Job type is required'),
  experience_level: Yup.string().required('Experience level is required'),
  salary_range: Yup.string().required('Salary range is required'),
  skills: Yup.array().min(1, 'At least one skill is required')
});

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, skills, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSkills());
  }, [dispatch]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(createJob(values)).unwrap();
      resetForm();
      navigate('/dashboard');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Post a New Job
        </Typography>
        <Typography color="text.secondary">
          Fill in the details below to create a new job listing
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={{
          title: '',
          description: '',
          requirements: '',
          category_id: '',
          location: '',
          type: '',
          experience_level: '',
          salary_range: '',
          skills: []
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Job Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category_id"
                    name="category_id"
                    value={values.category_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.category_id && Boolean(errors.category_id)}
                    label="Category"
                    disabled={loading}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category_id && errors.category_id && (
                    <Typography color="error" variant="caption">
                      {errors.category_id}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="type-label">Job Type</InputLabel>
                  <Select
                    labelId="type-label"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.type && Boolean(errors.type)}
                    label="Job Type"
                    disabled={loading}
                  >
                    <MenuItem value="full-time">Full Time</MenuItem>
                    <MenuItem value="part-time">Part Time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                  </Select>
                  {touched.type && errors.type && (
                    <Typography color="error" variant="caption">
                      {errors.type}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="experience-label">Experience Level</InputLabel>
                  <Select
                    labelId="experience-label"
                    id="experience_level"
                    name="experience_level"
                    value={values.experience_level}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.experience_level && Boolean(errors.experience_level)}
                    label="Experience Level"
                    disabled={loading}
                  >
                    <MenuItem value="entry">Entry Level</MenuItem>
                    <MenuItem value="mid">Mid Level</MenuItem>
                    <MenuItem value="senior">Senior Level</MenuItem>
                    <MenuItem value="lead">Lead</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                  </Select>
                  {touched.experience_level && errors.experience_level && (
                    <Typography color="error" variant="caption">
                      {errors.experience_level}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="salary_range"
                  name="salary_range"
                  label="Salary Range"
                  value={values.salary_range}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salary_range && Boolean(errors.salary_range)}
                  helperText={touched.salary_range && errors.salary_range}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  options={skills}
                  getOptionLabel={(option) => option.name}
                  value={values.skills}
                  onChange={(event, newValue) => {
                    setFieldValue('skills', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Required Skills"
                      error={touched.skills && Boolean(errors.skills)}
                      helperText={touched.skills && errors.skills}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        key={option.id}
                      />
                    ))
                  }
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Job Description"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="requirements"
                  name="requirements"
                  label="Job Requirements"
                  multiline
                  rows={4}
                  value={values.requirements}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.requirements && Boolean(errors.requirements)}
                  helperText={touched.requirements && errors.requirements}
                  disabled={loading}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Post Job'
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/dashboard')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default PostJob; 