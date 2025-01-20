import express from 'express';
import { deleteTaskController, editTaskController, newTaskController, getTasksController } from '../../controllers/api/tasks-controller';

const taskRouter = express.Router();

taskRouter.get('/all', getTasksController);

taskRouter.post('/new', newTaskController);

taskRouter.patch('/edit/:id', editTaskController);

taskRouter.delete('/delete/:id', deleteTaskController);

export default taskRouter;
