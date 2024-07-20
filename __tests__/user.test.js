import request from 'supertest';
import app from '../src/server.js';
import connectDB from '../src/config/db.config.js';
import mongoose from 'mongoose';
import User from '../src/models/user.model.js';

describe('API Endpoints for user', () => {

    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'The user is successfully registered');
    });

    it('should not register a user with an existing username', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'User already exists');
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/user/login')
            .send({
                username: 'testuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Login successful');
        expect(res.body).toHaveProperty('token');
    });

    it('should not login non-existent user', async () => {
        const res = await request(app)
            .post('/api/user/login')
            .send({
                username: 'nonexistentuser',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error', 'User does not exist');
    });

    it('should not login with incorrect credentials', async () => {
        await request(app)
            .post('/api/user/register')
            .send({
                username: 'testuser',
                password: 'password123'
            });

        const res = await request(app)
            .post('/api/user/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error', 'Invalid Credentials');
    });

});
