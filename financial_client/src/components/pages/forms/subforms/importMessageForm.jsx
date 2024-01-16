import React from 'react';

const ImportMessage = ({ message }) => {
    return (
        message && <p style={{ color: 'green' }}>{message}</p>
    );
};

export default ImportMessage;