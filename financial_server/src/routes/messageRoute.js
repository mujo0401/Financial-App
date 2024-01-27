import express from 'express';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const messageType = req.query.messageType;
  MessageController.getMessage(messageType, res);
});

export default router;