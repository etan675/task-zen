import { Request, Response } from 'express';
import { createAuthService, createSessionService } from '../initservices';
import path from "path";
import { basePath } from '../appConsts';

const authService = createAuthService();
const sessionService = createSessionService();

const loginController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/login.html'));
}

const loginPostController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const auth = await authService.authenticate(email, password);

    if (auth) {
        const session = await sessionService.createSession();

        console.log('sessionid: ', session.id);
        
        //TODO: set cookie with sid
        res.json({ message: 'Login successful' })

    } else {
        res.status(401).json({ message: 'Login failed' });
    }
}

export {
    loginController,
    loginPostController
}