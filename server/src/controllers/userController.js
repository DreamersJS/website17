import jwt from 'jsonwebtoken';
import { validate as isUUID } from 'uuid';
import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, getUserByIdService, loginUserService, updateUserService } from './service/user.service.js';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

/**
 * Create a new user(Register)
 * const { username, email, password, coachId  } = req.body;
 * coachId is optional and can be null for now
 */
export const createUser = async (req, res, next) => {
  const { username, email, password, coachId } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    const result = await createUserService(req.body)
    const token = jwt.sign(
      {
        userId: result.id,
        email: result.email,
        role: result.role,
        isBlocked: result.isBlocked,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
      },
    );

    // Store token in HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true, // Prevents JavaScript access
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      sameSite: 'Strict', // Prevents CSRF
      maxAge: 3600 * 1000, // 1 hour
    });
    res.status(201).json({
      message: 'User created successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// login a user
/*Only include the token in the res if your application explicitly needs to support clients that cannot rely on cookies (e.g., mobile apps). */
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await loginUserService({ email, password });

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
        coachId: user.coachId,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600 * 1000,
    });

    res.status(200).json({
      message: 'Login successful',
      data: user,
    });

  } catch (error) {
    next(error);
  }
};

// Logout a user
export const logoutUser = (req, res, next) => {
  res.clearCookie('authToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// Update an existing user
export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedUser = await updateUserService(id, req.body);
    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    next(error);
  }
};

// Fetch a single user by ID
export const fetchUser = async (req, res, next) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({ error: 'Invalid UUID format' });
  }

  try {
    const user = await getUserByIdService(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User fetched successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// Fetch a single user by email
export const getUserByEmail = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await getUserByEmailService(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User fetched successfully', data: user });
  } catch (error) {
    next(error);
  }
};

// Fetch all users
export const fetchAllUsers = async (req, res, next) => {
  console.log('Fetching all users...');
  try {
    const users = await getAllUsersService();
    console.log(users);
    res.status(200).json({ message: 'Users fetched successfully', data: users });
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteUserService(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
