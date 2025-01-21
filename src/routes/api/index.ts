import express from 'express';
import taskRouter from './tasks';
import userRouter from './user';

const apiRouter = express.Router();

apiRouter.use('/tasks', taskRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;