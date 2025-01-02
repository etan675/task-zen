import path from 'path';
import { Request, Response } from 'express';
import { basePath } from '../appConsts';
import { createAuthService } from '../initServices';

const authService = createAuthService();

const loginController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, 'public/login.html'));
}

const loginPostController = (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    //TODO: implement this
    const auth = authService.authenticate(email, password);

    res.json({ auth });
}

export {
    loginController,
    loginPostController
}