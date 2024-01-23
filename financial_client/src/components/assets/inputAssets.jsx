import { styled } from '@mui/material/styles';

export const Input = styled('input')(({ theme }) => ({
    display: 'block',
    padding: '10px',
    border: `1px solid ${theme.palette.primary.main}`, 
    borderRadius: theme.shape.borderRadius,
    margin: '10px 0 10px 10px',
    width: '30%', 
    boxSizing: 'border-box', 
    '&:focus': {
      borderColor: theme.palette.primary.main, 
      outline: 'none',
    },
  }));
  