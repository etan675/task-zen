import express from 'express';
import { deleteTaskController, editTaskController, newTaskController, taskPageController, tasksController } from '../controllers/tasks-controller';

const taskRouter = express.Router();

taskRouter.get('/', taskPageController);

taskRouter.get('/all', tasksController);

taskRouter.post('/new', newTaskController);

taskRouter.patch('/edit/:id', editTaskController);

taskRouter.delete('/delete/:id', deleteTaskController);

export default taskRouter;
