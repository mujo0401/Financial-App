import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const router = express.Router();

// Configure multer for memory storage
const memoryStorage = multer({ storage: multer.memoryStorage() });

// Route to handle file uploads
router.post('/', memoryStorage.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No file uploaded.');
        }
        for (const file of req.files) {
            const fileData = {
                filename: file.originalname,
                filesize: file.size,
                mediatype: file.mimetype,
                encoding: file.encoding,
                isprocessed: false,
                importdate: new Date().toLocaleDateString()

            };
    
            fileData.filehash = fileController.generateFileHash(file.buffer);
            let existingFile = await fileController.addFile(fileData);
    
            if (!existingFile) {
                console.log('File already exists with this hash.');
            }
        }
    
        res.status(200).send('Files uploaded and processed successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to handle file deletion by hash
router.delete('/delete/:hash', async (req, res) => {
    try {
        const hash = req.params.hash;
        const result = await fileController.deleteFile(hash);
        if (result) {
            res.status(200).send('File deleted successfully');
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;