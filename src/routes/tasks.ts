import express from 'express';
import { checkTaskController, deleteTaskController, newTaskController, tasksController } from '../controllers/tasksController';

const taskRouter = express.Router();

taskRouter.get('/', tasksController);

taskRouter.post('/new', newTaskController);

taskRouter.patch('/check/:id', checkTaskController);

taskRouter.delete('/delete/:id', deleteTaskController);

export default taskRouter;
