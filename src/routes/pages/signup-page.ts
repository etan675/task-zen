import express from 'express';
import signupPageController from '../../controllers/signup-page-controller';

const signupPageRouter = express.Router();

signupPageRouter.get('/', signupPageController);

export default signupPageRouter;