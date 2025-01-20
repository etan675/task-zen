import express from 'express';
import loginPageController from '../../controllers/login-page-controller';

const loginPageRouter = express.Router();

loginPageRouter.get('/', loginPageController);

export default loginPageRouter;