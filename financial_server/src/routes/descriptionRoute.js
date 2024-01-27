// routes.js or wherever you define your routes

import express from 'express';
import DescriptionController from '../controllers/descriptionController.js';

const router = express.Router();

router.get('/', DescriptionController.getDescriptions);

export default router;
