
import express from 'express';
import MappingController from '../controllers/mappingController.js';

const router = express.Router();

router.get('/', MappingController.getCategoryKeywords);


export default router;
