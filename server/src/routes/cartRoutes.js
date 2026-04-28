import express from 'express';
import { authenticateUser } from '../middleware/authentication.js';
import { createCart, deleteCart, deleteItemInCart, getCart, setItemToCart, updateQuantityInCart } from '../controllers/cartController.js';

const router = express.Router();

router.post('/create', authenticateUser, createCart);
router.get('/get', authenticateUser, getCart);
router.delete('/delete', authenticateUser, deleteCart);

router.post('/items', authenticateUser, setItemToCart);
router.delete('/items/:productId', authenticateUser, deleteItemInCart);
router.patch('/items/:productId', authenticateUser, updateQuantityInCart);

export default router;