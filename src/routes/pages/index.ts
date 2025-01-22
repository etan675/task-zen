import express from 'express';
import rootController from '../../controllers/root-controller';

const rootRouter = express.Router();

rootRouter.get('/', rootController);

export default rootRouter;