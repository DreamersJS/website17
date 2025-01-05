import express from 'express';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

coachRoutes.get('/list', (req, res) => {
    res.send('List of Coaches');
});

export default router;
