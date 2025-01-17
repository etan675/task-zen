import { Request, Response } from "express";
import { createTasksService } from "../initservices";
import path from "path";
import { basePath } from "../appConsts";

const taskService = createTasksService();

const taskPageController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/tasks.html'));
}

const getTasksController = async (req: Request, res: Response) => {
    // TODO: actual user id
    const allTasks = await taskService.getUserTasks(1);
    res.json(allTasks);
}

const newTaskController = async (req: Request, res: Response) => {
    const { newTask } = req.body;

    try {
        //TODO: actual user id
        const createdTask = await taskService.createUserTask(1, newTask);
        res.json(createdTask);

    } catch {
        res.status(400).json({ error: 'bad request, could not create task' });
    }
}

const editTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = req.body;

    try {
        //TODO: actual user id  
        const result = await taskService.editUserTask(parseInt(id), 1, fields);
        res.status(200).json(result);

    } catch {
        res.status(404).json({ error: 'item not found' })
    }
} 

const deleteTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        //TODO: actual user id  
        const deletedId = await taskService.deleteUserTask(parseInt(id), 1);
        res.json({ deletedId });

    } catch {
        res.status(404).json({ error: 'item not found' });
    }
}

export {
    newTaskController,
    getTasksController as tasksController,
    taskPageController,
    editTaskController,
    deleteTaskController
}