import express from 'express';
import transactionImportController from '../controllers/descriptionController.js';

const router = express.Router();

router.post('/', async (req, res) => { 
    await transactionImportController.importData(req.body, res);
});

export default router;

