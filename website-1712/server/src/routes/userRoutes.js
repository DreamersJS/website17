import express from 'express';
import {
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  fetchAllUsers,
} from '../controllers/userController.js';
// import { verifyAdmin } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.post('/', createUser);       
router.get('/:id', fetchUser);     
router.put('/:id', updateUser);     
router.delete('/:id', authenticateUser, deleteUser);  
router.get('/email/:email', getUserByEmail); 
router.get('/all', fetchAllUsers); 
// router.get('/all', authenticateUser, verifyAdmin, fetchAllUsers);

export default router;
