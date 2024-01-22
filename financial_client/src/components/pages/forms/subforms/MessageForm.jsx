import React from 'react';

const MessageForm = ({ message, messageType }) => {
  return (
    <div>
      {message && <p style={{ color: messageType === 'error' ? 'red' : 'green' }}>{message}</p>}
    </div>
  );
};

export default MessageForm;