import express from 'express';
import logoutController from '../controllers/logout-controller';

const logoutRouter = express.Router();

logoutRouter.post('/', logoutController);

export default logoutRouter;