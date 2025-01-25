import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate as isUUID } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET_KEY

/**
 * Create a new user(Register)
 * const { username, email, password, coachId  } = req.body;
 * coachId is optional and can be null for now
 */
export const createUser = async (req, res) => {
  const { username, email, password, coachId } = req.body;
  console.log("coachId being passed:", coachId);

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const isValidUUID = (id) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

    const sanitizedCoachId = coachId && isValidUUID(coachId) ? coachId : null;
    console.log("Sanitized coachId:", sanitizedCoachId);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        coachId: sanitizedCoachId || null,
        password: hashedPassword,
        // role: 'user', // Default role
      },
    });

    const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Store token in HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production 
      sameSite: 'Strict', // Prevents CSRF
      maxAge: 3600 * 1000, // 1 hour
    });

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username, email } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// login a user
/*Only include the token in the res if your application explicitly needs to support clients that cannot rely on cookies (e.g., mobile apps). */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
};

// Logout a user
export const logoutUser = (req, res) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Update an existing user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, coachId } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        coachId,
      },
    });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Fetch a single user by ID
export const fetchUser = async (req, res) => {
  const { id } = req.params;

  console.log("id being passed:", id);
  if (!isUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    debugger;
    const user = await prisma.user.findFirst({
      where: {
        id: id,  // Fetch by ID
      }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

// Fetch a single user by email
export const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'Failed to fetch user by email' });
  }
};

// Fetch all users
export const fetchAllUsers = async (req, res) => {
  console.log('Fetching all users...');
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { coachId: null }, // Optional `null` coachId
          { coachId: { not: null } }, // Valid UUID coachId
        ],
      },

    });
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
