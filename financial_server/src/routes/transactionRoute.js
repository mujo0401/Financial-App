import express from 'express';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received a POST request to /');
  console.log('Request body:', req.body);
  try {
    const response = await transactionController.addTransaction(req.body, res);
    console.log('Response:', response);
    res.send(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'An error occurred while processing the request.' });
  }
});

export default router;
