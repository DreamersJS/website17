import express from 'express';
import { authenticateUser } from '../middleware/authentication';
import { createCart, deleteCart, getCart } from '../controllers/cartController';

const router = express.Router();

router.post('/create', authenticateUser, createCart);
router.get('/get', authenticateUser, getCart);
router.put('/update', authenticateUser, );
router.delete('/delete', authenticateUser, deleteCart);
