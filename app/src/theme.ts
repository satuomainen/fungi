import { createTheme } from '@mui/material';

export const appColors = {
  background: '#FFFFB3',
  color: '#008000',
};

export const appTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#008C8C',
      contrastText: '#FFF5C3',
    },
    secondary: {
      main: '#C44A26',
    },
    background: {
      default: appColors.background,
      paper: appColors.background,
    },
    text: {
      primary: appColors.color,
      secondary: '#2C3E50',
    },
    error: {
      main: '#C44A26',
    },
    warning: {
      main: '#E4C084',
    },
    info: {
      main: '#78A693',
    },
    success: {
      main: '#008C8C',
    },
  },
  typography: {
    fontFamily: ['"Noto Serif"', 'serif'].join(','),
    h4: {
      fontWeight: 'bold',
      [`@media (max-width:600px)`]: {
        fontSize: '1rem',
      },
    },
    h6: {
      fontWeight: 'bold',
      [`@media (max-width:600px)`]: {
        fontSize: '0.75rem',
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});
