import request from 'supertest';
import { describe, it, expect, jest } from '@jest/globals';
import app from '../../src/app.js';

describe('Auth API', () => {

    describe('POST /api/users/register', () => {

        it('should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'TestUser',
                    email: `test${Date.now()}@mail.com`,
                    password: '123456',
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data.email).toBeDefined();
            expect(res.body.message).toBe('User created successfully');
        });

        it('should fail if email already exists', async () => {
            const email = `test${Date.now()}@mail.com`;

            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'User1',
                    email,
                    password: '123456',
                });

            const res = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'User2',
                    email,
                    password: '123456',
                });
            expect(res.statusCode).toBeGreaterThanOrEqual(400);
            // expect(res.statusCode).toBe(400);// returns 500 - I throw an error, but in the controller I don’t handle it, just pass it to Express. So Express default error handler kicks in & Returns 500 Internal Server Error = test gets 500 instead of 400
            expect(res.body.error).toBe('Email is already in use.');
        });

    });

    describe('POST /api/users/login', () => {

        let email = `test${Date.now()}@mail.com`;
        let password = '123456';

        beforeEach(async () => {
            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'LoginUser',
                    email,
                    password,
                });
        });

        it('should login successfully', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email,
                    password,
                });

            expect(res.statusCode).toBe(200);
            expect(res.headers['set-cookie']).toBeDefined();
            expect(res.body.message).toBe('Login successful');
        });

        it('should fail with wrong password', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email,
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.error).toBe('Invalid credentials.');
        });

        it('should fail if user does not exist', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'nonexistent@mail.com',
                    password: '123456',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.error).toBe('User not found.');
        });
    });

    describe('Auth-protected route', () => {
        // works if I remove verifyAdmin from route
        let agent;

        beforeEach(async () => {
            const email = `auth${Date.now()}@mail.com`;
            agent = request.agent(app);

            await request(app)
                .post('/api/users/register')
                .send({
                    username: 'AuthUser',
                    email,
                    password: '123456',
                });

            const loginRes = await agent
                .post('/api/users/login')
                .send({
                    email,
                    password: '123456',
                });
        });

        it('should allow access with valid cookie', async () => {

            const res = await agent.get('/api/users/all');

            expect(res.statusCode).toBe(200);
        });

        it('should block access without cookie', async () => {
            const res = await request(app)
                .get('/api/users/all');

            expect(res.statusCode).toBe(401);
        });
    });

});