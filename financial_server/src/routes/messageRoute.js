import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.get('/', (req, res) => {
  const messageType = req.query.messageType;
  messageController.getMessage(messageType, res);
});

export default router;