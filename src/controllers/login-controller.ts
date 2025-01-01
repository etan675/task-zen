import path from 'path';
import { Request, Response } from 'express';
import { basePath } from '../appConsts';

const loginController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, 'public/login.html'));
}

export {
    loginController,
}