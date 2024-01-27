
import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', CategoryController.getCategories);


export default router;
