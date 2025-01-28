import express from 'express';
import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';
import { blockUser, changeUserRole } from '../controllers/coachController.js';

const router = express.Router();


router.post("/:userId/block", authenticateUser, verifyAdmin, blockUser);
router.put("/:userId/role", authenticateUser, verifyAdmin, changeUserRole);

export default router;
