import { Request, Response } from 'express';

const rootController = (req: Request, res: Response) => {
    res.redirect('/tasks');
}

export default rootController;