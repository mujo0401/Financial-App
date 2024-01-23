import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.main,
      boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
    },
  }));
  
  export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: '10px 15px',
    color: theme.palette.secondary.main,
    textAlign: 'left',
  }));
  
  export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2),
  }));
  
  export const StyledDialogContentText = styled(DialogContentText)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));
  
  export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(1),
    justifyContent: 'flex-end',
  }));

  export const getWarningSymbol = (messageType) => {
    return messageType === 'error' ? '⚠️' : '✅';
  };

  export const Spinner = styled('div')({
    width: '40px',
    height: '40px',
    position: 'relative',
    margin: '100px auto',
    '& .double-bounce1, & .double-bounce2': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#333',
      opacity: 0.6,
      position: 'absolute',
      top: 0,
      left: 0,
      animation: 'sk-bounce 2.0s infinite ease-in-out',
    },
    '& .double-bounce2': {
      animationDelay: '-1.0s',
    },
    '@keyframes sk-bounce': {
      '0%, 100%': {
        transform: 'scale(0.0)',
      },
      '50%': {
        transform: 'scale(1.0)',
      },
    },
  });

  export const messageStyles = {
    color: messageType => messageType === 'error' ? 'red' : 'green',
    fontSize: '1.2em',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    animation: 'flash 1s',
  };