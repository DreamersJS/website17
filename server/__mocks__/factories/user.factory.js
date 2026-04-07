import prisma from '../../src/config/prisma.js';
import { v4 as uuid } from 'uuid';

export async function createUser(overrides = {}) {
  return prisma.user.create({
    data: {
      id: uuid(),
      username: 'testUser',
      email: `test-${Date.now()}@gmail.com`,
      password: 'hashed',
      ...overrides,
    },
  });
}

export function getAuthHeader(user) {
  const token = generateToken({ userId: user.id });
  return `Bearer ${token}`;
}
//.set('Authorization', getAuthHeader(user))