import express from 'express';
import taskRouter from './tasks';

const apiRouter = express.Router();

apiRouter.use('/tasks', taskRouter);

export default apiRouter;