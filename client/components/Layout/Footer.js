import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton,
  useTheme
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  LinkedIn as LinkedInIcon, 
  Instagram as InstagramIcon 
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', url: '/about' },
      { name: 'Our Team', url: '/team' },
      { name: 'Careers', url: '/careers' },
      { name: 'Contact Us', url: '/contact' },
    ],
    resources: [
      { name: 'Blog', url: '/blog' },
      { name: 'News', url: '/news' },
      { name: 'FAQ', url: '/faq' },
      { name: 'Help Center', url: '/help' },
    ],
    legal: [
      { name: 'Terms of Service', url: '/terms' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'Cookie Policy', url: '/cookies' },
      { name: 'Security', url: '/security' },
    ],
  };

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'background.paper',
        py: 6,
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4} md={3}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Applier
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connecting talented professionals with their dream jobs since 2020. 
              Our mission is to make the job search process seamless and efficient.
            </Typography>
            <Box sx={{ mt: 2 }}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index} 
                  component="a" 
                  href={social.url} 
                  target="_blank" 
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
                  Company
                </Typography>
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    color="text.secondary"
                    display="block"
                    variant="body2"
                    sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
                  Resources
                </Typography>
                {footerLinks.resources.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    color="text.secondary"
                    display="block"
                    variant="body2"
                    sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
                  Legal
                </Typography>
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    color="text.secondary"
                    display="block"
                    variant="body2"
                    sx={{ mb: 1, '&:hover': { color: 'primary.main' } }}
                    underline="hover"
                  >
                    {link.name}
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Applier. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for job seekers and employers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 