import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const router = express.Router();

const memoryStorage = multer({ storage: multer.memoryStorage() });

router.post('/', memoryStorage.array('files', 10), async (req, res) => {
        for (const file of req.files) {
            const fileData = fileController.createFileData(file);
            await fileController.addFile(fileData);      
        }     
    });

router.delete('/delete/:hash', async (req, res) => {
    const { hash } = req.params;
    await fileController.deleteFile(hash, res);
  });

export default router;