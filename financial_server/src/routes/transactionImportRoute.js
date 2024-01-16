import express from 'express';
import fileController from '../controllers/fileController.js';
import transactionImportController from '../controllers/descriptionController.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await transactionImportController.importData(req.body);
        res.status(200).send('Finance data processed successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:hash', async (req, res) => {
    try {
        const result = await fileController.deleteFile(); 
        if (result.deletedCount === 0) {
            return res.status(404).send('No file found with the given hash.');
        }
        res.send('File deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
