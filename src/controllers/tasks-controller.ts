import { Request, Response } from "express";
import { createTasksService } from "../initServices";

const taskService = createTasksService();

const tasksController = async (req: Request, res: Response) => {
    try {
        const allTasks = await taskService.getTasks();
        res.json(allTasks);

    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}

const newTaskController = async (req: Request, res: Response) => {
    const { newTask } = req.body;

    try {
        const createdTask = await taskService.createTask(newTask);
        res.json(createdTask);

    } catch {
        res.status(400).json({ error: 'bad request, could not create task' });
    }
}

const editTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const fields = req.body;

    try {
        const result = await taskService.editTask(parseInt(id), fields);
        res.status(200).json(result);

    } catch {
        res.status(404).json({ error: 'item not found' })
    }
} 

const deleteTaskController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedId = await taskService.deleteTask(parseInt(id));
        res.json({ deletedId });

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