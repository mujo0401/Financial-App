import React from 'react';
import { getWarningSymbol, messageStyles } from 'components/assets/messageAssets';

const MessageForm = ({ message, messageType }) => {
  const warningSymbol = getWarningSymbol(messageType);

  return (
    <div>
      {message && (
        <p style={messageStyles}>
          {warningSymbol} {message}
        </p>
      )}
    </div>
  );
};

export default MessageForm;