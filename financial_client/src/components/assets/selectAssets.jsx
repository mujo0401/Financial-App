import { styled } from '@mui/material/styles';

export const StyledSelect = styled('select')(({ theme }) => ({
    display: 'block',
    padding: '10px',
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: '4px',
    margin: '10px 0 10px 10px',
    width: '30%',
    boxSizing: 'border-box',
  
    '&:focus': {
      borderColor: theme.palette.primary.main,
      outline: 'none',
    },
  }));