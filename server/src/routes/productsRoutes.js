import express from 'express';
import {
  handleGetAllProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  handleCreateProduct,
  handleGetProductById,
} from '../controllers/productsController.js';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

/**
 * @desc Get all products
 * @route GET /api/product/all
 * @access Public
 * @docs    See: docs/api-doc.md#get-apiproductall
 */
router.get('/all', handleGetAllProducts);
router.get('/:id', handleGetProductById);
router.post('/', authenticateUser, verifyAdmin, handleCreateProduct);
router.put('/:id', authenticateUser, verifyAdmin, handleUpdateProduct);
router.delete('/:id', authenticateUser, verifyAdmin, handleDeleteProduct);

export default router;
