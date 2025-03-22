import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Rating, 
  Paper,
  Divider,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  CardMedia,
  Chip,
  Fade,
  Grow,
  Slide,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Work as WorkIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  ArrowForward as ArrowForwardIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Star as StarIcon,
  Close as CloseIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../services/api';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Photo showcase data with job images
  const showcaseJobs = [
    {
      id: 1,
      title: "Software Development",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Build the next generation of applications",
      count: 256
    },
    {
      id: 2,
      title: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Create beautiful and functional interfaces",
      count: 189
    },
    {
      id: 3,
      title: "Marketing",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Connect products with their audience",
      count: 143
    },
    {
      id: 4,
      title: "Data Science",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Extract insights from complex data",
      count: 112
    }
  ];
  
  useEffect(() => {
    // Set visibility for animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Fetch jobs data
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // In a real app, this would call your API
        // const response = await jobService.getAllJobs({ featured: true, limit: 3 });
        // setFeaturedJobs(response.jobs);
        
        // Using mock data for now
        const mockJobs = [
          {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'Tech Innovations Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: 120000,
            image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            id: 2,
            title: 'UX/UI Designer',
            company: 'Design Masters',
            location: 'New York, NY',
            type: 'Full-time',
            salary: 95000,
            image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          },
          {
            id: 3,
            title: 'Marketing Specialist',
            company: 'Growth Hackers',
            location: 'Chicago, IL',
            type: 'Contract',
            salary: 85000,
            image: 'https://images.unsplash.com/photo-1551135049-8a33b5883817?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setFeaturedJobs(mockJobs);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
    
    // Auto-rotate showcase slides
    const slideInterval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % showcaseJobs.length);
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, []);

  // Mock data for statistics with incrementing counters
  const stats = [
    { icon: <WorkIcon />, label: 'Active Jobs', value: '1,234', target: 1234 },
    { icon: <BusinessIcon />, label: 'Companies', value: '456', target: 456 },
    { icon: <TrendingUpIcon />, label: 'Success Rate', value: '89%', target: 89 },
  ];

  // Mock data for testimonials with detailed information
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      rating: 5,
      text: 'Found my dream job in just two weeks! The platform is incredibly user-friendly.',
      details: {
        fullReview: 'I had been searching for a new software engineering position for months with little success. After signing up on this platform, I was able to connect with multiple companies that matched my skills and interests. The interface is intuitive, and the job matching algorithm is impressively accurate. Within two weeks, I had three offers and accepted my dream job at Tech Corp.',
        pros: [
          'Intuitive and easy-to-use interface',
          'Accurate job matching algorithm',
          'Quick response from employers',
          'Helpful resume review service'
        ],
        cons: [
          'Could use more filter options for job searches',
          'Mobile app occasionally had lag issues'
        ],
        date: 'March 15, 2023',
        jobApplied: 'Senior Frontend Developer',
        yearsExperience: 6
      }
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'HR Manager',
      company: 'Innovation Labs',
      rating: 5,
      text: 'The best platform for finding talented candidates. Highly recommended!',
      details: {
        fullReview: 'As an HR manager responsible for hiring technical talent, this platform has been a game-changer for our recruitment process. The quality of candidates we\'ve found here is exceptional, and the platform\'s screening tools save us countless hours. We\'ve reduced our time-to-hire by 40% since adopting this service, and the caliber of new hires has improved dramatically.',
        pros: [
          'High-quality candidate pool',
          'Excellent screening and filtering tools',
          'Easy to track applicants and pipelines',
          'Good integration with our HR software'
        ],
        cons: [
          'Premium features are somewhat costly for small businesses',
          'Could improve the messaging system between recruiters and candidates'
        ],
        date: 'February 3, 2023',
        positions: 'Multiple technical roles',
        hiringSuccess: '85% of positions filled through platform'
      }
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Product Manager',
      company: 'StartUpX',
      rating: 4,
      text: 'Streamlined our hiring process significantly. Great experience overall.',
      details: {
        fullReview: `StartUpX needed to scale quickly, and this platform helped us do exactly that. 
          The interface is clean and modern, making it easy to post multiple positions and manage applicants. 
          I especially appreciate the built-in screening questions feature, which saved our team significant time in the initial review process. 
          While there are a few features I'd like to see improved, overall it's been essential to our growth.`,
        pros: [
          'Easy job posting process',
          'Excellent candidate management tools',
          'Good analytics on posting performance',
          'Responsive customer support'
        ],
        cons: [
          'Limited customization for company profile',
          'Could use more integrated assessment tools',
          'Pricing model could be more flexible for startups'
        ],
        date: 'January 20, 2023',
        teamGrowth: 'Hired 12 team members in 3 months',
        favoriteFeature: 'Candidate tracking dashboard'
      }
    },
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?search=${searchQuery}`);
  };
  
  const handlePrevSlide = () => {
    setActiveSlide(prev => (prev - 1 + showcaseJobs.length) % showcaseJobs.length);
  };
  
  const handleNextSlide = () => {
    setActiveSlide(prev => (prev + 1) % showcaseJobs.length);
  };
  
  const toggleFavorite = (jobId) => {
    setFavorites(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };
  
  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setReviewDialogOpen(true);
  };
  
  const handleCloseReviewDialog = () => {
    setReviewDialogOpen(false);
  };

  return (
    <Box>
      {/* Job Categories Showcase Section - Full Width */}
      <Box sx={{ 
        position: 'relative',
        overflow: 'hidden',
        height: '500px',
        mb: 8,
        backgroundColor: theme.palette.grey[100],
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}>
        {showcaseJobs.map((job, index) => (
          <Box
            key={job.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: activeSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${job.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Fade in={activeSlide === index} timeout={1000}>
              <Box textAlign="center" color="white" p={3}>
                <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                  {job.title}
                </Typography>
                <Typography variant="h5" paragraph>
                  {job.description}
                </Typography>
                <Chip 
                  label={`${job.count} jobs available`} 
                  color="primary" 
                  sx={{ mb: 3, fontSize: '1rem', py: 2 }}
                />
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/jobs?category=${job.title}`)}
                >
                  Browse {job.title} Jobs
                </Button>
              </Box>
            </Fade>
          </Box>
        ))}
        
        {/* Navigation controls */}
        <Box sx={{ 
          position: 'absolute', 
          bottom: 20, 
          left: 0, 
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}>
          {showcaseJobs.map((_, index) => (
            <Box 
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: activeSlide === index ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </Box>
        
        {/* Slide controls */}
        <IconButton 
          sx={{ 
            position: 'absolute', 
            left: 20, 
            top: '50%', 
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5)' }
          }}
          onClick={handlePrevSlide}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        
        <IconButton 
          sx={{ 
            position: 'absolute', 
            right: 20, 
            top: '50%', 
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5)' }
          }}
          onClick={handleNextSlide}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Fade in={isVisible} timeout={1000}>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Find Your Dream Job Today
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4 }}>
              Connect with top companies and opportunities that match your skills and aspirations.
            </Typography>
            
            {/* Search Bar */}
            <Box component="form" onSubmit={handleSearch} sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search jobs by title, company, or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" color="primary">
                        <ArrowForwardIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/jobs')}
              >
                Browse Jobs
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Fade>

        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Grow in={isVisible} timeout={1000} style={{ transformOrigin: '0 0 0' }} {...{ timeout: 500 + index * 200 }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 2,
                        '& svg': { fontSize: 40 },
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" component="div" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography color="text.secondary">{stat.label}</Typography>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Jobs Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Featured Jobs
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : (
            <Grid container spacing={4}>
              {featuredJobs.map((job, index) => (
                <Grid item xs={12} md={4} key={job.id}>
                  <Slide direction="up" in={isVisible} timeout={500 + index * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: 3,
                        transition: 'transform 0.3s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: 6,
                        },
                      }}
                      onClick={() => navigate(`/jobs/${job.id}`)}
                    >
                      <CardMedia
                        component="img"
                        height="160"
                        image={job.image}
                        alt={job.title}
                      />
                      <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                        <IconButton
                          size="small"
                          sx={{ 
                            position: 'absolute', 
                            right: 8, 
                            top: 8, 
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'grey.200' }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(job.id);
                          }}
                        >
                          {favorites.includes(job.id) ? (
                            <FavoriteIcon color="primary" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                        
                        <Typography gutterBottom variant="h6" component="h3">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {job.company}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <WorkIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {job.type}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="h6" color="primary">
                          ${job.salary.toLocaleString()}/year
                        </Typography>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          )}
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/jobs')}>
              View All Jobs
            </Button>
          </Box>
        </Box>

        {/* Testimonials Section - Clickable */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Fade in={isVisible} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                    onClick={() => handleReviewClick(testimonial)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{ width: 56, height: 56, mr: 2, bgcolor: theme.palette.primary.main }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      "{testimonial.text}"
                    </Typography>
                    <Button 
                      variant="text" 
                      color="primary" 
                      sx={{ alignSelf: 'flex-end', mt: 2 }}
                    >
                      Read More
                    </Button>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Box sx={{ mb: 4 }}>
          <Grow in={isVisible} timeout={1000}>
            <Paper
              sx={{
                p: 6,
                textAlign: 'center',
                background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                color: 'white',
                borderRadius: 4,
                boxShadow: 6,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Ready to Start Your Journey?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of successful professionals and companies
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    bgcolor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/jobs')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Browse Jobs
                </Button>
              </Box>
            </Paper>
          </Grow>
        </Box>
      </Container>
      
      {/* Review Detail Dialog */}
      <Dialog 
        open={reviewDialogOpen} 
        onClose={handleCloseReviewDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedReview && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h5">{selectedReview.name}'s Review</Typography>
                <IconButton onClick={handleCloseReviewDialog}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{ width: 64, height: 64, mr: 2, bgcolor: theme.palette.primary.main }}
                  >
                    {selectedReview.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{selectedReview.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedReview.role} at {selectedReview.company}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Rating value={selectedReview.rating} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Posted on {selectedReview.details.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Full Review
                </Typography>
                <Typography paragraph>
                  {selectedReview.details.fullReview}
                </Typography>
                
                <Divider sx={{ my: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ThumbUpIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="success.main">
                        Pros
                      </Typography>
                    </Box>
                    <List>
                      {selectedReview.details.pros.map((pro, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <StarIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={pro} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ThumbDownIcon color="error" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="error.main">
                        Cons
                      </Typography>
                    </Box>
                    <List>
                      {selectedReview.details.cons.map((con, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <StarIcon color="error" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={con} />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Grid container spacing={2}>
                    {Object.entries(selectedReview.details)
                      .filter(([key]) => !['fullReview', 'pros', 'cons', 'date'].includes(key))
                      .map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Typography variant="subtitle2" color="text.secondary" component="span">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: 
                          </Typography>
                          <Typography component="span" sx={{ ml: 1 }}>
                            {value}
                          </Typography>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseReviewDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Home;
