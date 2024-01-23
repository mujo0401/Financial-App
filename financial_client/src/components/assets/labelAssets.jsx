import { styled } from '@mui/material/styles';

export const Label = styled('label')(({ theme }) => ({
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontSize: '16px', 
    fontWeight: 'bold',
    lineHeight: 1.5,
    textTransform: 'uppercase',
  
    '&:focus-within': {
      color: '#1B39E3', 
    },
  }));
  