import express from "express";
import {
  createUser,
  fetchUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  fetchAllUsers,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/userController.js";
import { verifyAdmin } from "../middleware/authorizationAdmin.js";
import { authenticateUser } from "../middleware/authentication.js";
import { verifyOwnershipOrAdmin } from "../middleware/verifyOwnershipOrAdmin.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// router.get('/all', fetchAllUsers); // for testing purposes only
router.get("/all", authenticateUser, verifyAdmin, fetchAllUsers);
router.get("/email/:email", authenticateUser, getUserByEmail);
router.get("/:id", authenticateUser, verifyOwnershipOrAdmin, fetchUser);
router.put("/:id", authenticateUser, verifyOwnershipOrAdmin, updateUser);
router.delete("/:id", authenticateUser, verifyOwnershipOrAdmin, deleteUser);
router.post("/refresh", refreshAccessToken);

export default router;
