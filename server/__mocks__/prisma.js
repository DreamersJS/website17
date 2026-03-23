import { jest } from '@jest/globals';


export const prismaMock = {
    product: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    tag: {
      upsert: jest.fn(),
    },
    productTag: {
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
  };