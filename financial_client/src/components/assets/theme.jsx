import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005f73',
    },
    secondary: {
      main: '#0a9396',
    },
    delete: {
      main: '#9b2226',
    },
    edit: {
      main: '#ff4d4d',
    },
    process: {
      main: '#94d2bd',
    },
    background: {
      main: '#d5f2eb',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '1em',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
  },
});

export default theme 