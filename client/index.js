import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#64B5F6', // Light blue
            light: '#90CAF9',
            dark: '#42A5F5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#FF6B6B',
            light: '#FF8E8E',
            dark: '#FF4848',
            contrastText: '#ffffff',
          },
          background: {
            default: '#e0e0e0',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#666666',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#64B5F6', // Light blue
            light: '#90CAF9',
            dark: '#42A5F5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#FF6B6B',
            light: '#FF8E8E',
            dark: '#FF4848',
            contrastText: '#ffffff',
          },
          background: {
            default: '#424242',
            paper: '#1a1a1a',
          },
          text: {
            primary: '#ffffff',
            secondary: '#cccccc',
          },
        }),
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
}; 