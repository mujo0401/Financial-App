import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const ErrorDialogForm = ({ isOpen, onClose, errorMessage }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="error-dialog-title"
            aria-describedby="error-dialog-description"
        >
            <DialogTitle id="error-dialog-title">{"File duplication detected"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="error-dialog-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialogForm;