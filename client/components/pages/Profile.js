import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateProfile, fetchUserProfile } from '../store/slices/authSlice';
import { fetchUserSkills, addSkill, removeSkill } from '../store/slices/skillSlice';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must contain only digits'),
  bio: Yup.string().max(500, 'Bio must be less than 500 characters')
});

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const { userSkills } = useSelector((state) => state.skills);
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchUserSkills());
  }, [dispatch]);

  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      await dispatch(updateProfile(values)).unwrap();
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddSkill = async () => {
    if (newSkill.trim()) {
      await dispatch(addSkill({ name: newSkill.trim() }));
      setNewSkill('');
      setOpenSkillDialog(false);
    }
  };

  const handleRemoveSkill = async (skillId) => {
    await dispatch(removeSkill(skillId));
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

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Profile Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Formik
                initialValues={{
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  email: user?.email || '',
                  phone: user?.phone || '',
                  bio: user?.bio || ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdateProfile}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="email"
                          name="email"
                          label="Email Address"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="phone"
                          name="phone"
                          label="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="bio"
                          name="bio"
                          label="Bio"
                          multiline
                          rows={4}
                          value={values.bio}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.bio && Boolean(errors.bio)}
                          helperText={touched.bio && errors.bio}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <CircularProgress size={24} /> : 'Save Changes'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Skills</Typography>
                <Button
                  size="small"
                  onClick={() => setOpenSkillDialog(true)}
                >
                  Add Skill
                </Button>
              </Box>

              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {userSkills.map((skill) => (
                  <Chip
                    key={skill.id}
                    label={skill.name}
                    onDelete={() => handleRemoveSkill(skill.id)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Role"
                    secondary={user?.role === 'employer' ? 'Employer' : 'Job Seeker'}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Member Since"
                    secondary={new Date(user?.created_at).toLocaleDateString()}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Last Updated"
                    secondary={new Date(user?.updated_at).toLocaleDateString()}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Skill Dialog */}
      <Dialog open={openSkillDialog} onClose={() => setOpenSkillDialog(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill Name"
            fullWidth
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSkillDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSkill} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 