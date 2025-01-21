import express from 'express';
import { getLoggedInUserController } from '../../controllers/api/user-controller';

const userRouter = express.Router();

userRouter.get('/loggedInUser', getLoggedInUserController);

export default userRouter;