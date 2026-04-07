import request from 'supertest';
import { describe, it, expect, jest } from '@jest/globals';
import app from '../src/app.js';
import { createUser } from '../__mocks__/factories/user.factory.js';
// import jwt from 'jsonwebtoken';

// jest.mock('jsonwebtoken', () => ({
//     verify: jest.fn(),
//     sign: jest.fn()
// }));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        verify: jest.fn(),
    },
}));

const jwt = (await import('jsonwebtoken')).default;

describe('GET users', () => {

    it('should return all users', async () => {
        const res = await request(app)
            .get('/api/users/all')
            .set('Authorization', 'Bearer token');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe('Users fetched successfully');
    });

    it('should return all users (real auth)', async () => {
        let cookies;
        const email = `test${Date.now()}@gmail.com`;

        await request(app)
            .post('/api/users/register')
            .send({
                username: 'Test',
                email,
                password: '123456'
            });

        const loginRes = await request(app)
            .post('/api/users/login')
            .send({
                email,
                password: '123456'
            });

        cookies = loginRes.headers['set-cookie'];


        const res = await request(app)
            .get('/api/users/all')
            .set('Cookie', cookies);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe('Users fetched successfully');

    });

    jwt.verify.mockReturnValue({
        userId: '123',
        email: 'test@gmail.com',
        role: 'admin',
        isBlocked: false,
    });

    it('should return all users (mocked auth)', async () => {
        const res = await request(app)
            .get('/api/users/all')
            .set('Authorization', 'Bearer fakeToken');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Users fetched successfully');
    });

    it('should block unauthorized access', async () => {
        const res = await request(app)
            .get('/api/users/all');

        expect(res.statusCode).toBe(401);
    });

    it('should return user by id', async () => {
        const user = await createUser();

        const res = await request(app)
            .get(`/api/users/${user.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(user.id);
    });

    it('should return User not found', async () => {
        const nonExistingId = '550e8400-e29b-41d4-a716-446655440000';

        const res = await request(app)
            .get(`/api/users/${nonExistingId}`);

        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('User not found');
    });

    it('should return 400 for invalid UUID', async () => {
        const res = await request(app)
            .get('/api/users/invalid-id');

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Invalid UUID format');
    });

});

describe('GET /api/users/all (integration)', () => {

    it('should return all users after login', async () => {

        const email = `test${Date.now()}@gmail.com`;

        // 1. Register
        const registerRes = await request(app)
            .post('/api/users/register')
            .send({
                username: 'Test User',
                email,
                password: '123456'
            });

        expect(registerRes.statusCode).toBe(201);

        // 2. Login
        const loginRes = await request(app)
            .post('/api/users/login')
            .send({
                email,
                password: '123456'
            });

        expect(loginRes.statusCode).toBe(200);

        const cookies = loginRes.headers['set-cookie'];
        expect(cookies).toBeDefined();

        // 3. Access protected route
        const res = await request(app)
            .get('/api/users/all')
            .set('Cookie', cookies);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Users fetched successfully');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

});

describe('POST users', () => {

    it('should register new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'John',
                email: `john${Date.now()}@gmail.com`, // avoid duplicate
                password: '123456'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User created successfully');
        expect(res.body).toHaveProperty('data');
    });

    it('should fail to register if missing fields', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({ email: 'test@gmail.com' });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Username, email, and password are required.');
    });

});
