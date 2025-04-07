import express from  'express';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
} from '../controllers/product.controller.js';

const router = express.Router();

// Public route - anyone can view products
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes - Only authenticated users (and admins) can create, update, or delete products
router.post('/', verifyToken, isAdmin, createProduct);
router.put('/:id', verifyToken, isAdmin, updateProduct);
router.delete('/:id',verifyToken, isAdmin, deleteProduct);

export default router