import express from 'express';
import {
  fetchAllProducts,
} from '../controllers/productsController.js';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.use(express.json());

router.get('/all', fetchAllProducts); 
// router.post('/',authenticateUser,verifyAdmin, createProduct);  
// router.put('/product/:id',authenticateUser,verifyAdmin, updateProduct); 
// router.delete('/product/:id',authenticateUser,verifyAdmin, deleteProduct); 


export default router;