import { styled } from '@mui/material/styles';

export const ButtonContainer = {
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: '20px',
  };

export const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    height: '40px',
    padding: '10px',
    border: 'none',
    borderRadius: theme.shape.borderRadius, 
    cursor: 'pointer',
    fontSize: theme.typography.fontSize,
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main, 
    },
    '&:focus': {
      outline: 'none',
    },
  }));

  export const ClearButton = styled('button')(({ theme }) => ({
    backgroundColor: 'red',
    color: 'white',
    height: '40px',
    padding: '10px',
    border: 'none',
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize,
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'darkred',
    },
    '&:before': {
    },
  }));

  export const DeleteButton = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.delete.main,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: theme.shape.borderRadius, 
    cursor: 'pointer',
    fontSize: theme.typography.fontSize,
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.delete.main, 
    },
    '&:focus': {
      outline: 'none',
    },
  }));

  export const EditButton = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.edit.main,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: theme.shape.borderRadius, 
    cursor: 'pointer',
    fontSize: theme.typography.fontSize,
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.edit.main, 
    },
    '&:focus': {
      outline: 'none',
    },
  }));
  
  export const ProcessButton = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.process.main,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: theme.shape.borderRadius, 
    cursor: 'pointer',
    fontSize: theme.typography.fontSize,
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.process.main, 
    },
    '&:focus': {
      outline: 'none',
    },
  }));
