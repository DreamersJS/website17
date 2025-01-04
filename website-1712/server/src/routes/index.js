import express from 'express';
import  userRoutes  from './userRoutes.js';
// import coachRoutes from './coachRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
// router.use('/coaches', coachRoutes);

export default router;