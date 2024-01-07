import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/',async (req, res) => {
    await transactionController.addTransaction(req.body, res);
  });

export default router;
