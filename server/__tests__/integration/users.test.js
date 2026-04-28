import request from 'supertest';
import { describe, it, expect, jest } from '@jest/globals';
import app from '../../src/app.js';
import { createUser } from '../../__mocks__/factories/user.factory.js';

describe('api/users',()=>{
    
    it('should return user by id', async () => {
        const user = await createUser();

        const res = await request(app)
            .get(`/api/users/${user.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data.id).toBe(user.id);
    });

    it('should return 400 if user not found', async () => {
        const res = await request(app)
            .get('/api/users/invalid-id');
    
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBeDefined();
    });

})