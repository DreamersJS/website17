import prisma from '../../config/prisma.js';
import bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';
import { AppError } from '../../utils/AppError.js';

export const createUserService = async (userData) => {
  const { username, email, password, coachId } = userData;

  if (!username || !email || !password) {
    throw new AppError('Username, email and password are required.', 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email is already in use.', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sanitizedCoachId = coachId && isUUID(coachId) ? coachId : null;
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      coachId: sanitizedCoachId || null,
      password: hashedPassword,
    },
  });

  const { password: _, ...safeUser } = newUser;
  /**This means:
  take password
  rename it to _
  don’t use it 
  or
  const newUser = await prisma.user.create({
  data: {...},
  select: {
    id: true,
    username: true,
    email: true,
    role: true,
    coachId: true,
    isBlocked: true
  }
});select only controls what you return, not what you store. */
  return safeUser;
};

export const loginUserService = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('User not found.', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials.', 401);
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const updateUserService = async (id, data) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  const { password: _, ...safeUser } = updatedUser;

  return safeUser;
};

export const getUserByIdService = async (id) => {
  if (!isUUID(id)) {
    throw new AppError('Invalid UUID format', 401);
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const getUserByEmailService = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const { password: _, ...safeUser } = user;

  return safeUser;
};

export const getAllUsersService = async () => {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { coachId: null }, // Optional `null` coachId
        { coachId: { not: null } }, // Valid UUID coachId
      ],
    },
  });

  return users.map(({ password: _, ...user }) => user);
};

export const deleteUserService = async (id) => {
  await prisma.user.delete({ where: { id } });

  return { message: 'User deleted successfully' };
};