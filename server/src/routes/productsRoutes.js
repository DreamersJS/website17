import express from 'express';
import {
  getAllProducts, updateProduct, deleteProduct, createProduct, getProductById
} from '../controllers/productsController.js';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';
// import {  } from '../../../docs';

const router = express.Router();

router.use(express.json());
/**
 * @desc Get all products
 * @route GET /api/product/all
 * @access Public
 * @docs    See: docs/api-doc.md#get-apiproductall
 */
router.get('/all', getAllProducts); 
router.get('/:id', getProductById);
router.post('/',authenticateUser,verifyAdmin, createProduct);  
router.put('/:id',authenticateUser,verifyAdmin, updateProduct); 
router.delete('/:id',authenticateUser,verifyAdmin, deleteProduct); 


export default router;