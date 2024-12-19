import { Request, Response } from "express";
import { createTasksService } from "../initServices";

const taskService = createTasksService();

const tasksController = (req: Request, res: Response) => {
    const allTasks = taskService.getTasks()

    res.json(allTasks);
}

const newTaskController = (req: Request, res: Response) => {
    const { newTask } = req.body;

    try {
        const createdTask = taskService.createTask(newTask);

        res.json(createdTask);

    } catch {
        res.status(400).json({ error: 'bad request, could not create task' });
    }
}

const editTaskController = (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = req.body;

    try {
        const result = taskService.editTask(parseInt(id), fields);

        res.status(200).json(result);

    } catch {
        res.status(404).json({ error: 'item not found' })
    }
} 

const deleteTaskController = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedId = taskService.deleteTask(parseInt(id));

        res.json({ deletedId: deletedId });

    } catch {
        res.status(404).json({ error: 'item not found' });
    }
}

export {
    newTaskController,
    tasksController,
    editTaskController,
    deleteTaskController
}