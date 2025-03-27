import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
} from '@material-ui/core';
import { useAuth } from '../context/AuthContext';

const CreateJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
      setShowError(true);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Post a New Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Post Job
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        message={error}
      />
    </Container>
  );
};

export default CreateJob; 