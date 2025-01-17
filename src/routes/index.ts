import express from 'express';

const rootRouter = express.Router();

rootRouter.get('/', (req: express.Request, res: express.Response) => {
    res.redirect('/tasks');
})

export default rootRouter;