import express from 'express';
import userRoutes  from './userRoutes.js';
import coachRoutes from './coachRoutes.js';
import productsRoutes from './productsRoutes.js';
import searchRoutes from './searchRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/coaches', coachRoutes);
router.use('/product', productsRoutes);
router.use('/search', searchRoutes);



export default router;