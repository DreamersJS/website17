import jwt from "jsonwebtoken";
import { validate as isUUID } from "uuid";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getStoredRefreshTokenHash,
  getUserByEmailService,
  getUserByIdService,
  invalidateSession,
  loginUserService,
  storeRefreshTokenHash,
  updateUserService,
} from "./service/user.service.js";
import { AppError } from "../utils/AppError.js";
import { ACCESS_SECRET } from "../config/env.js";
import { REFRESH_SECRET } from "../config/env.js";
import { compareHash, hash } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateTokenHelper.js";

if (!ACCESS_SECRET) {
  throw new Error("JWT_SECRET_KEY missing");
}

if (!REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET missing");
}

export const createUser = async (req, res, next) => {
  try {
    const user = await createUserService(req.validatedData);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store token in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "Lax", // Prevents CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    const hashedRefreshToken = await hash(refreshToken);
    await storeRefreshTokenHash(user.id, hashedRefreshToken);

    res.status(201).json({
      message: "User created successfully",
      data: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
      meta: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// login a user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.validatedData;
  try {
    const user = await loginUserService({ email, password });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // in production:
    // sameSite: 'None',
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const hashedRefreshToken = await hash(refreshToken);
    await storeRefreshTokenHash(user.id, hashedRefreshToken);

    res.status(200).json({
      message: "Login successful",
      data: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
      meta: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Logout a user
export const logoutUser = async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  try {
    await invalidateSession(req.user.userId)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error)
  }
};

// Update an existing user - backend should whitelist allowed fields
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const allowedUpdates = req.user.role === "ADMIN" ? ["username", "email", "isBlocked"] : ["username", "email"];

  const updates = {};

  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });
  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }
  try {
    const updatedUser = await updateUserService(id, updates);
    res.status(200).json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Fetch a single user by ID
export const fetchUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    next(error);
  }
};

// Fetch a single user by email
export const getUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  if (req.user.email !== req.params.email) {
    throw new AppError("Unauthorized", 403);
  }
  if (req.user.role !== "ADMIN") {
    throw new AppError("Unauthorized", 403);
  }
  try {
    const user = await getUserByEmailService(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    next(error);
  }
};

// Fetch all users
export const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    const parsed = userSchema.array().parse(users);
    res.status(200).json({ message: "Users fetched successfully", data: parsed });
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new AppError("No refresh token", 401);
  }

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const session = await getStoredRefreshTokenHash(decoded.userId)

    if (!session?.data.refreshTokenHash) {
      throw new AppError("Session not found", 403);
    }
    const match = await compareHash(token, session?.data.refreshTokenHash);
    if (!match) {
      throw new AppError("Invalid refresh token", 403);
    }
    const user = await getUserByIdService(decoded.userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const hashedRefreshToken = await hash(refreshToken);
    await storeRefreshTokenHash(user.id, hashedRefreshToken);

    res.status(200).json({
      // success: true, // sounds good for testing
      message: "User re-fetched successfully",
      data: user,
      meta: {
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
