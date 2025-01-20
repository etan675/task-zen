import express from 'express';
import tasksPageController from '../../controllers/tasks-page-controller';

const taskPageRouter = express.Router();

taskPageRouter.get('/', tasksPageController);

export default taskPageRouter;
