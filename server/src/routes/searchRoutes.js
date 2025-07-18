import express from 'express';
import { authorizeRole } from '../middleware/authorizationAdmin.js';
import { authenticateUser } from '../middleware/authentication.js';
import { searchProducts } from '../controllers/searchController.js';

const router = express.Router();

router.use(express.json());

  // You do not put query strings (?q=...) into route definitions — Express automatically parses them via req.query.
  router.get(`/`, searchProducts)

export default router;
