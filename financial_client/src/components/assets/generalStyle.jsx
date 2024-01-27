import { styled } from '@mui/material/styles';

export const StyledTh = styled('th')(({ theme }) => ({
  padding: '10px 15px',
  border: '1px solid #ddd',
  color: theme.palette.secondary.main,
  textAlign: 'left',
}));

export const StyledTr = styled('tr')(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f8f8f8',
  },
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
}));

export const StyledTd = styled('td')({
  padding: '10px 15px',
  border: '1px solid #ddd',
});

export const navStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed', 
  top: '0', 
  width: '100%', 
  backgroundColor: 'rgba(10, 147, 150, 0.5)',
  zIndex: '1000', 
  ':hover': {
    backgroundColor: '#0056b3', 
  },
};

export const DropzoneStyles = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'border .24s ease-in-out, background-color .24s ease-in-out',
  backgroundColor: theme.palette.background.main,
  color: theme.palette.text.primary,
  fontSize: '1.2em',
}));

export const ActiveDropzone = styled(DropzoneStyles)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.text.secondary,
}));

export const Style = () => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
  },
  
  thead: {
    backgroundColor: '#333',
    color: '#fff',
  },
  th: {
    padding: '10px 15px',
    border: '1px solid #ddd',
  },
  td: {
    padding: '10px 15px',
    border: '1px solid #ddd',
  },
  tr: {
    '&:nth-of-type(even)': {
      backgroundColor: '#f8f8f8',
    },
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
});




