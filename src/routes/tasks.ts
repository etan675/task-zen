import express from 'express';

const taskRouter = express.Router();

const data = [
    { id: 1, content: 'item 1' },
    { id: 2, content: 'item 2' },
    { id: 3, content: 'item 3' }
];

taskRouter.get('/', (req, res) => {
    res.json(data);
})

taskRouter.post('/new-task', (req, res) => {
    const { newTask } = req.body;

    if (!newTask) {
        res.status(400).send('bad request, name is required');
    }

    data.push({
        id: data.length ? data[data.length - 1].id + 1 : 1,
        content: newTask
    })

    res.redirect('/')
})

export default taskRouter;
