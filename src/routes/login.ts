import express from 'express';
import { loginController, loginPostController } from '../controllers/login-controller';

const loginRouter = express.Router();

loginRouter.get('/', loginController);
loginRouter.post('/', loginPostController);

export {
    loginRouter
};