import { Request, Response } from "express";

// in memory data for now
const data = [
    { id: 1, content: 'item 1', checked: false },
    { id: 2, content: 'item 2', checked: false },
    { id: 3, content: 'item 3', checked: false }
];

const tasksController = (req: Request, res: Response) => {
    res.json(data);
}

const newTaskController = (req: Request, res: Response) => {
    const { newTask } = req.body;

    if (newTask) {
        data.push({
            id: data.length ? data[data.length - 1].id + 1 : 1,
            content: newTask,
            checked: false
        })
        
        res.redirect('/'); 
    } else {
        res.status(400).json({ error:'bad request, name is required' });
    }
}

const checkTaskController = (req: Request, res: Response) => {
    const { id } = req.params;

    const taskIndex = data.findIndex((task) => {
        return task.id === parseInt(id);
    })

    if (taskIndex !== -1) {
        data[taskIndex].checked = !data[taskIndex].checked;

        res.json(data);

    } else {
        res.status(404).json({ error: 'item not found' })
    }
}

const deleteTaskController = (req: Request, res: Response) => {
    const { id } = req.params;

    const taskIndex = data.findIndex((task) => {
        return task.id === parseInt(id);
    })

    if (taskIndex !== -1) {
        data.splice(taskIndex, 1);

        res.status(200).json({ message: 'data deleted successfully' });
    } else {
        res.status(404).json({ error: 'item not found' })
    }
}

export {
    newTaskController,
    tasksController,
    checkTaskController,
    deleteTaskController
}