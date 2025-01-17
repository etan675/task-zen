import { Response } from "express";
import { createTasksService } from "../initservices";
import path from "path";
import { basePath } from "../appConsts";
import { CustomRequest as Request } from "../types/definitions";

const taskService = createTasksService();

const taskPageController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/tasks.html'));
}

const getTasksController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send('Not logged in');
        return;
    }

    const allTasks = await taskService.getUserTasks(req.user.id);
    res.json(allTasks);
}

const newTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send('Not logged in');
        return;
    }

    const { newTask } = req.body;

    try {
        const createdTask = await taskService.createUserTask(req.user.id, newTask);
        res.json(createdTask);

    } catch {
        res.status(500).json({ error: 'could not create task' });
    }
}

const editTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send('Not logged in');
        return;
    }

    const { id } = req.params;
    const fields = req.body;

    try {
        const result = await taskService.editUserTask(parseInt(id), req.user.id, fields);
        res.status(200).json(result);

    } catch {
        res.status(404).json({ error: 'item not found' })
    }
} 

const deleteTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).send('Not logged in');
        return;
    }

    const { id } = req.params;

    try {
        const deletedId = await taskService.deleteUserTask(parseInt(id), req.user.id);
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