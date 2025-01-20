import { Request, Response } from 'express';
import path from "path";
import { basePath } from '../app-consts';

const loginPageController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/login.html'));
}

export default loginPageController;