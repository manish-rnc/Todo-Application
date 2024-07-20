import request from 'supertest';
import app from '../src/server.js';
import connectDB from '../src/config/db.config.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const sampleTodo = {
    title: 'test todo',
    description: 'this todo is for testing using jest',
    status: false
};
const userId = '6699eadf3890dd7d1b3d65d4';
const userToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY);

describe('todo controller', () => {

    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST method -> /api/todo', () => {
        it('should create a new todo', async () => {
            const res = await request(app)
                .post('/api/todo')
                .send(sampleTodo)
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('title', sampleTodo.title);
        });
    });

    describe('GET method -> /api/todo', () => {
        it('should show all todos created by the user', async () => {
            const res = await request(app)
                .get('/api/todo')
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('PUT method -> /api/todo/:id', () => {
        it('should update an existing todo', async () => {
            const todoRes = await request(app)
                .post('/api/todo')
                .send(sampleTodo)
                .set('Authorization', `Bearer ${userToken}`);

            const todoId = todoRes.body._id;
            const updatedTodo = {
                title: 'updated todo',
                description: 'this todo is updated',
                status: true
            };

            const res = await request(app)
                .put(`/api/todo/${todoId}`)
                .send(updatedTodo)
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('title', updatedTodo.title);
            expect(res.body).toHaveProperty('description', updatedTodo.description);
            expect(res.body).toHaveProperty('status', updatedTodo.status);
        });
    });

    describe('DELETE method -> /api/todo/:id', () => {
        it('should delete a todo', async () => {
            const todoRes = await request(app)
                .post('/api/todo')
                .send(sampleTodo)
                .set('Authorization', `Bearer ${userToken}`);

            const todoId = todoRes.body._id;

            const res = await request(app)
                .delete(`/api/todo/${todoId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message', 'Todo is deleted successfully!');
        });
    });

});
