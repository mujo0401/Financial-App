import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const router = express.Router();

const memoryStorage = multer({ storage: multer.memoryStorage() });

router.post('/', memoryStorage.array('files', 10), async (req, res) => {
    console.log('Received a POST request to /');
    console.log('Files:', req.files);
    try {
        for (const file of req.files) {
            const fileData = fileController.createFileData(file);
            const result = await fileController.addFile(fileData);
            console.info('File added:', result);
        }
        res.status(200).send({ message: 'Files added successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'An error occurred while adding the files.' });
    }
});

router.delete('/delete/:hash', async (req, res) => {
    const { hash } = req.params;
    console.log('Received a DELETE request to /delete/:hash');
    console.log('Hash:', hash);
    try {
        const result = await fileController.deleteFile(hash, res);
        console.info('File deleted:', result);
        res.status(200).send({ message: 'File deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'An error occurred while deleting the file.' });
    }
});

export default router;