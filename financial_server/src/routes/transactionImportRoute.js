import express from 'express';
import TransactionImportController from '../controllers/transactionImportController.js';

const router = express.Router();

router.post('/', async (req, res) => { 
    console.log('Received a POST request to /');
    console.log('Request body:', req.body);
    try {
    await TransactionImportController.importData(req.body, res);
    console.log('Response:', response);
    res.send(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: 'An error occurred while processing the request.' });
  }
  });

  export default router;
  