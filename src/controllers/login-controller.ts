import { Request, Response } from 'express';
import { createAuthService } from '../initservices';
import path from "path";
import { basePath } from '../appConsts';

const authService = createAuthService();

const loginController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/login.html'));
}

const loginPostController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const auth = await authService.authenticate(email, password);

    if (auth) {
        // TODO: set session
        
        res.json({ message: 'Login successful' })

    } else {
        res.status(401).json({ message: 'Login failed' });
    }
}

export {
    loginController,
    loginPostController
}