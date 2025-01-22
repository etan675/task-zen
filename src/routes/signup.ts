import express from 'express';
import signupController from '../controllers/signup-controller';

const signupRouter = express.Router();

signupRouter.post('/', signupController)

export default signupRouter;