import express from 'express';
import {
  getAllProducts, updateProduct, deleteProduct, createProduct
} from '../controllers/productsController.js';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.use(express.json());

router.get('/all', getAllProducts); 
router.post('/',authenticateUser,verifyAdmin, createProduct);  
router.put('/:id',authenticateUser,verifyAdmin, updateProduct); 
router.delete('/:id',authenticateUser,verifyAdmin, deleteProduct); 


export default router;