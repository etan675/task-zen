import { Request, Response } from 'express';
import path from "path";
import { basePath } from '../app-consts';

const signupPageController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/signup.html'));
}

export default signupPageController;