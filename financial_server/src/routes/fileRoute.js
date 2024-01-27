import express from 'express';
import multer from 'multer';
import FileController from '../controllers/fileController.js';
import MessageController from '../controllers/messageController.js';

const router = express.Router();

const memoryStorage = multer({ storage: multer.memoryStorage() });

router.post('/', memoryStorage.array('files', 10), async (req, res) => {
    console.log('Received a POST request to /');
    console.log('Files:', req.files);
    try {
        for (const file of req.files) {
            const fileData = FileController.createFileData(file);
             await FileController.addFile(fileData);

        }
        const message = await messageController.getMessage('File_Success');
        return res.status(200).send({ messageType: 'File_Success', message });

    } catch (error) {
        if (error.message === 'Duplication_Error') {
            const message = await MessageController.getMessage('Duplication_Error');
            return res.status(409).send({ messageType: 'Duplication_Error', message });
        }
        const message = await MessageController.getMessage('Server_Error');
        return res.status(500).send({ messageType: 'Server_Error', message });
    }
});

router.delete('/delete/filename/:hash', async (req, res) => {
    const { hash } = req.params;
    console.log('Received a DELETE request to /delete/:hash');
    console.log('Hash:', hash);
    try {
        const result = await FileController.deleteFile(hash, res);
        console.info('File deleted:', result);
        res.status(200).send({ messageType: 'Delete_Success', message: 'File(s) deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ messageType: 'Delete_Error', message: 'An error occurred while deleting the file.' });
    }
});

router.get('/filename/:hash', async (req, res) => {
    const { hash } = req.params;
    try {
        const filename = await FileController.getFileName(hash);
        res.status(200).send({ filename });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'An error occurred while getting the filename.' });
    }
});

export default router;