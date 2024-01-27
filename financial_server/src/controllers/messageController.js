import sequelize from "../services/connectionService.js";

const MessageController = {
  getMessage: async (messageType, res = null) => {
    try {
      if (!messageType || typeof messageType !== 'string' || messageType.trim() === '') {
        const error = { error: 'Invalid or missing messageType parameter' };
        if (res) {
          return res.status(400).json(error);
        } else {
          throw new Error(error.error);
        }
      }
      console.log('messageType:', messageType);
      const [results] = await sequelize.query('EXEC sp_getMessages @messageType = :messageType', {
        replacements: { messageType },
        type: sequelize.QueryTypes.SELECT
      });

      if (res) {
        res.json(results);
      } else {
        return results;
      }
    } catch (err) {
      console.error('Error getting message:', err);
      if (res) {
          res.status(500).json({ error: err.message });
      } else {
          return { messageName: 'An error occurred while getting the message.' };
      }
    }
  },
};

export default MessageController;