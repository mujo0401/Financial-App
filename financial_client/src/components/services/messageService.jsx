const MESSAGE_URL = 'http://localhost:3000/api/messages'; 

const MessageService = {
  getMessage: async (messageType) => {
    try {
      const response = await fetch(`${MESSAGE_URL}?messageType=${(messageType)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('No data returned by the server');
      }

      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return {};
    }
  }
};
export default MessageService;