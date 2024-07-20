import express from 'express';
import { createTodo, deleteTodo, showAllTodos, updateTodo } from '../controllers/todo.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const todoRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the todo
 *         userId:
 *           type: string
 *           description: The id of the user who created the todo
 *         title:
 *           type: string
 *           description: The title of the todo
 *         description:
 *           type: string
 *           description: The description of the todo
 *         status:
 *           type: boolean
 *           description: The status of the todo
 *       example:
 *         title: Complete it
 *         description: Look for all the checks and finalize
 *         status: false
 */


/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 */


/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some error happened
 */
todoRouter.post('/', isAuthenticated, createTodo);


/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Some error happened
 */
todoRouter.get('/', isAuthenticated, showAllTodos);


/**
 * @swagger
 * /api/todo/{id}:
 *   put:
 *     summary: Update the todo by the id
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 *       500:
 *         description: Some error happened
 */
todoRouter.put('/:id', isAuthenticated, updateTodo);


/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *       404:
 *         description: The todo was not found
 */
todoRouter.delete('/:id', isAuthenticated, deleteTodo);

export default todoRouter;
