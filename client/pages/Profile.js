import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Divider,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  CloudUpload as CloudUploadIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  InsertDriveFile as FileIcon
} from '@mui/icons-material';
import { updateProfileStart, updateProfileSuccess, updateProfileFailure } from '../store/slices/authSlice';
import { authService } from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  
  // Dialog states
  const [openSkillDialog, setOpenSkillDialog] = useState(false);
  const [openEducationDialog, setOpenEducationDialog] = useState(false);
  const [openExperienceDialog, setOpenExperienceDialog] = useState(false);
  const [openSocialDialog, setOpenSocialDialog] = useState(false);
  
  // Form values
  const [newSkill, setNewSkill] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  
  // Education dialog form
  const [educationForm, setEducationForm] = useState({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  // Experience dialog form
  const [experienceForm, setExperienceForm] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });
  
  // Social media dialog form
  const [socialForm, setSocialForm] = useState({
    platform: 'linkedin',
    url: ''
  });
  
  // Profile form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    jobTitle: '',
    skills: [],
    education: [],
    experience: [],
    jobPreferences: {
      jobType: 'full-time',
      salaryExpectation: '',
      remote: false,
      availability: 'immediately'
    },
    socialLinks: {
      linkedin: '',
      github: '',
      twitter: '',
      portfolio: ''
    },
    resumeUrl: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        location: user.location || '',
        jobTitle: user.jobTitle || '',
        skills: user.skills || [],
        education: user.education || [],
        experience: user.experience || [],
        jobPreferences: user.jobPreferences || {
          jobType: 'full-time',
          salaryExpectation: '',
          remote: false,
          availability: 'immediately'
        },
        socialLinks: user.socialLinks || {
          linkedin: '',
          github: '',
          twitter: '',
          portfolio: ''
        },
        resumeUrl: user.resumeUrl || ''
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    const [section, field] = name.split('.');
    
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: checked
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(updateProfileStart());

    try {
      const response = await authService.updateProfile(formData);
      dispatch(updateProfileSuccess(response));
      setSuccess('Profile updated successfully');
      setLoading(false);
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (error) {
      dispatch(updateProfileFailure(error.response?.data?.message || 'Failed to update profile'));
      setError(error.response?.data?.message || 'Failed to update profile');
      setLoading(false);
      
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
      setOpenSkillDialog(false);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleAddEducation = () => {
    if (educationForm.school && educationForm.degree) {
      setFormData({
        ...formData,
        education: [...formData.education, { ...educationForm, id: Date.now() }]
      });
      setEducationForm({
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      setOpenEducationDialog(false);
    }
  };
  
  const handleRemoveEducation = (id) => {
    setFormData({
      ...formData,
      education: formData.education.filter(edu => edu.id !== id)
    });
  };
  
  const handleAddExperience = () => {
    if (experienceForm.company && experienceForm.position) {
      setFormData({
        ...formData,
        experience: [...formData.experience, { ...experienceForm, id: Date.now() }]
      });
      setExperienceForm({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
      setOpenExperienceDialog(false);
    }
  };
  
  const handleRemoveExperience = (id) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter(exp => exp.id !== id)
    });
  };
  
  const handleAddSocialLink = () => {
    if (socialForm.url) {
      setFormData({
        ...formData,
        socialLinks: {
          ...formData.socialLinks,
          [socialForm.platform]: socialForm.url
        }
      });
      setSocialForm({
        platform: 'linkedin',
        url: ''
      });
      setOpenSocialDialog(false);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      // In a real application, you would upload the file here
      // and then set the resumeUrl in formData
      setFormData({
        ...formData,
        resumeUrl: URL.createObjectURL(file) // This is just for preview
      });
    }
  };
  
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <LinkedInIcon />;
      case 'github':
        return <GitHubIcon />;
      case 'twitter':
        return <TwitterIcon />;
      default:
        return <VisibilityIcon />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 120, height: 120, mb: 2 }}
                >
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {formData.firstName} {formData.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {formData.jobTitle || 'Your Job Title'}
                </Typography>
                {formData.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {formData.location}
                    </Typography>
                  </Box>
                )}
                
                {/* Social Links */}
                <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
                  {formData.socialLinks.linkedin && (
                    <Tooltip title="LinkedIn">
                      <IconButton 
                        color="primary" 
                        component="a" 
                        href={formData.socialLinks.linkedin} 
                        target="_blank"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {formData.socialLinks.github && (
                    <Tooltip title="GitHub">
                      <IconButton 
                        color="primary" 
                        component="a" 
                        href={formData.socialLinks.github} 
                        target="_blank"
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {formData.socialLinks.twitter && (
                    <Tooltip title="Twitter">
                      <IconButton 
                        color="primary" 
                        component="a" 
                        href={formData.socialLinks.twitter} 
                        target="_blank"
                      >
                        <TwitterIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {formData.socialLinks.portfolio && (
                    <Tooltip title="Portfolio">
                      <IconButton 
                        color="primary" 
                        component="a" 
                        href={formData.socialLinks.portfolio} 
                        target="_blank"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Add Social Link">
                    <IconButton color="primary" onClick={() => setOpenSocialDialog(true)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {/* Resume Section */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Resume
                </Typography>
                {formData.resumeUrl ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FileIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        Resume.pdf
                      </Typography>
                    </Box>
                    <Box>
                      <Tooltip title="View Resume">
                        <IconButton 
                          size="small" 
                          color="primary"
                          component="a"
                          href={formData.resumeUrl}
                          target="_blank"
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Resume">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => setFormData({ ...formData, resumeUrl: '' })}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ) : (
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Upload Resume
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </Button>
                )}
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              {/* Skills Section */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Skills
                  </Typography>
                  <Tooltip title="Add Skill">
                    <IconButton size="small" onClick={() => setOpenSkillDialog(true)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                  {formData.skills.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Add skills to showcase your abilities
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
            
            {/* Job Preferences Card */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Job Preferences
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="job-type-label">Job Type</InputLabel>
                    <Select
                      labelId="job-type-label"
                      name="jobPreferences.jobType"
                      value={formData.jobPreferences.jobType}
                      label="Job Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="full-time">Full-time</MenuItem>
                      <MenuItem value="part-time">Part-time</MenuItem>
                      <MenuItem value="contract">Contract</MenuItem>
                      <MenuItem value="freelance">Freelance</MenuItem>
                      <MenuItem value="internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="availability-label">Availability</InputLabel>
                    <Select
                      labelId="availability-label"
                      name="jobPreferences.availability"
                      value={formData.jobPreferences.availability}
                      label="Availability"
                      onChange={handleChange}
                    >
                      <MenuItem value="immediately">Immediately</MenuItem>
                      <MenuItem value="1-week">1 Week</MenuItem>
                      <MenuItem value="2-weeks">2 Weeks</MenuItem>
                      <MenuItem value="1-month">1 Month</MenuItem>
                      <MenuItem value="more-than-month">More than a month</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Expected Salary"
                    name="jobPreferences.salaryExpectation"
                    value={formData.jobPreferences.salaryExpectation}
                    onChange={handleChange}
                    size="small"
                    InputProps={{
                      startAdornment: <AttachMoneyIcon fontSize="small" />,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.jobPreferences.remote}
                        onChange={handleSwitchChange}
                        name="jobPreferences.remote"
                        color="primary"
                      />
                    }
                    label="Open to remote work"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Save Preferences'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{ mb: 3 }}
              >
                <Tab icon={<PersonIcon />} label="Personal Info" />
                <Tab icon={<SchoolIcon />} label="Education" />
                <Tab icon={<WorkIcon />} label="Experience" />
              </Tabs>
              
              {/* Personal Info Tab */}
              {tabValue === 0 && (
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Job Title"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Save Personal Info'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
              
              {/* Education Tab */}
              {tabValue === 1 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Education
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenEducationDialog(true)}
                    >
                      Add Education
                    </Button>
                  </Box>
                  {formData.education.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <SchoolIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="body1" gutterBottom>
                        No education history added yet.
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Add your education to help employers learn about your background.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenEducationDialog(true)}
                      >
                        Add Education
                      </Button>
                    </Box>
                  ) : (
                    <List>
                      {formData.education.map((edu) => (
                        <Card key={edu.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="h6" component="div">
                                {edu.school}
                              </Typography>
                              <Box>
                                <IconButton size="small" onClick={() => handleRemoveEducation(edu.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                            </Typography>
                            {edu.description && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {edu.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save Education History'}
                    </Button>
                  </Box>
                </Box>
              )}
              
              {/* Experience Tab */}
              {tabValue === 2 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Work Experience
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => setOpenExperienceDialog(true)}
                    >
                      Add Experience
                    </Button>
                  </Box>
                  {formData.experience.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <WorkIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="body1" gutterBottom>
                        No work experience added yet.
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Add your work history to showcase your professional experience.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenExperienceDialog(true)}
                      >
                        Add Experience
                      </Button>
                    </Box>
                  ) : (
                    <List>
                      {formData.experience.map((exp) => (
                        <Card key={exp.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="h6" component="div">
                                {exp.position}
                              </Typography>
                              <Box>
                                <IconButton size="small" onClick={() => handleRemoveExperience(exp.id)}>
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                            <Typography variant="subtitle1" color="text.secondary">
                              {exp.company}
                            </Typography>
                            {exp.location && (
                              <Typography variant="body2" color="text.secondary">
                                {exp.location}
                              </Typography>
                            )}
                            <Typography variant="body2" color="text.secondary">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </Typography>
                            {exp.description && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {exp.description}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  )}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Save Work Experience'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      {/* Add Skill Dialog */}
      <Dialog open={openSkillDialog} onClose={() => setOpenSkillDialog(false)}>
        <DialogTitle>Add New Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Skill"
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
      
      {/* Add Education Dialog */}
      <Dialog 
        open={openEducationDialog} 
        onClose={() => setOpenEducationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Education</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                label="School/University"
                fullWidth
                value={educationForm.school}
                onChange={(e) => setEducationForm({ ...educationForm, school: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Degree"
                fullWidth
                value={educationForm.degree}
                onChange={(e) => setEducationForm({ ...educationForm, degree: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Field of Study"
                fullWidth
                value={educationForm.field}
                onChange={(e) => setEducationForm({ ...educationForm, field: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={educationForm.startDate}
                onChange={(e) => setEducationForm({ ...educationForm, startDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={educationForm.endDate}
                onChange={(e) => setEducationForm({ ...educationForm, endDate: e.target.value })}
                disabled={educationForm.current}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={educationForm.current}
                    onChange={(e) => setEducationForm({ ...educationForm, current: e.target.checked })}
                  />
                }
                label="I am currently studying here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={educationForm.description}
                onChange={(e) => setEducationForm({ ...educationForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEducationDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEducation} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add Experience Dialog */}
      <Dialog 
        open={openExperienceDialog} 
        onClose={() => setOpenExperienceDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Work Experience</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                label="Company"
                fullWidth
                value={experienceForm.company}
                onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Position"
                fullWidth
                value={experienceForm.position}
                onChange={(e) => setExperienceForm({ ...experienceForm, position: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                fullWidth
                value={experienceForm.location}
                onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={experienceForm.startDate}
                onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={experienceForm.endDate}
                onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                disabled={experienceForm.current}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={experienceForm.current}
                    onChange={(e) => setExperienceForm({ ...experienceForm, current: e.target.checked })}
                  />
                }
                label="I am currently working here"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={experienceForm.description}
                onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExperienceDialog(false)}>Cancel</Button>
          <Button onClick={handleAddExperience} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Add Social Link Dialog */}
      <Dialog 
        open={openSocialDialog} 
        onClose={() => setOpenSocialDialog(false)}
      >
        <DialogTitle>Add Social Link</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="platform-label">Platform</InputLabel>
                <Select
                  labelId="platform-label"
                  value={socialForm.platform}
                  label="Platform"
                  onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                >
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                  <MenuItem value="github">GitHub</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="portfolio">Portfolio</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="URL"
                fullWidth
                value={socialForm.url}
                onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSocialDialog(false)}>Cancel</Button>
          <Button onClick={handleAddSocialLink} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 