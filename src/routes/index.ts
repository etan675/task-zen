import express from 'express';
import rootController from '../controllers/root-controller';
import taskPageRouter from './pages/tasks-page';
import loginPageRouter from './pages/login-page';
import validateUserSession from '../middleware/validate-user-session';

const rootRouter = express.Router();

rootRouter.get('/', rootController);
rootRouter.use('/tasks', validateUserSession, taskPageRouter);
rootRouter.use('/login', loginPageRouter);

export default rootRouter;