
import express from 'express';
import mappingController from '../controllers/mappingController.js';

const router = express.Router();

router.get('/', mappingController.getCategoryKeywords);


export default router;
