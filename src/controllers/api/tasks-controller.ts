import { Response } from "express";
import { createTasksService } from "../../init-services";
import { CustomRequest as Request } from "../../types/definitions";

const taskService = createTasksService();

const getTasksController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const allTasks = await taskService.getUserTasks(req.user.id);
    res.json(allTasks);
}

const newTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const { newTask } = req.body;

    try {
        const createdTask = await taskService.createUserTask(req.user.id, newTask);
        res.json(createdTask);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const editTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const { id } = req.params;
    const fields = req.body;

    try {
        const result = await taskService.editUserTask(parseInt(id), req.user.id, fields);
        res.json(result);

    } catch (err) {
        if (err.message === 'User cannot edit this task') {
            res.status(403).json({ message: 'You are not authorised to edit this task' });
            return;
        }

        res.status(404).json({ message: 'item not found' })
    }
} 

const deleteTaskController = async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const { id } = req.params;

    try {
        const deletedId = await taskService.deleteUserTask(parseInt(id), req.user.id);
        res.json({ deletedId });

    } catch (err) {
        if (err.message === 'User cannot delete this task') {
            res.status(403).json({ message: 'You are not authorised to delete this task' });
            return;
        }

        res.status(404).json({ message: 'item not found' });
    }
}

export {
    newTaskController,
    getTasksController,
    editTaskController,
    deleteTaskController
}