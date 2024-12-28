import prisma from '../config/prisma.js';

/**
 * Create a new user
 * const { username, email, coachId } = req.body;
 */
export const createUser = async (req, res) => {
  const { username, email, coachId } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        coachId,
      },
    });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
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
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { coach: true }, // Include related coach information
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
    const { email } = req.params; // Extract email from request params
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { coach: true }, // Optionally include related coach information
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
    try {
      const users = await prisma.user.findMany({
        include: { coach: true }, // Include related coach data, if applicable
      });
  
      res.status(200).json({ users });
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
