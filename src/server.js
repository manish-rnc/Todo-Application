import express from 'express';
import 'dotenv/config'
import todoRouter from './routes/todo.route.js';
import userRouter from './routes/user.route.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.config.js';

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
