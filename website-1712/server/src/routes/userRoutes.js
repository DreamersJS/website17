import express from 'express';
import {
  createUser,
  // fetchUser,
  updateUser,
  deleteUser,
  // getUserByEmail,
  fetchAllUsers,
  loginUser,
  logoutUser,
} from '../controllers/userController.js';
import { verifyAdmin, authorizeRole } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

router.use(express.json());

router.post('/register', createUser);      
router.post('/login', loginUser);
router.post('/logout', logoutUser);  
     
// router.get('/:id', fetchUser);     
router.put('/:id', updateUser);     
router.delete('/:id', authenticateUser, authorizeRole('USER'), deleteUser);  
// router.get('/email/:email', getUserByEmail); 
router.get('/all', fetchAllUsers); // for testing purposes only
// router.get('/all', authenticateUser, verifyAdmin, fetchAllUsers);

export default router;
