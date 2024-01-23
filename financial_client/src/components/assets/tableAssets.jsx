import { styled } from '@mui/material/styles';



  export const StyledTable = styled('table')(({ theme }) => ({
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.main,
  }));
  
  export const TranTable = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#d5f2eb',
    padding: '15px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensure it's above other content
  }));