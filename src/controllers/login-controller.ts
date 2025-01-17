import { Request, Response } from 'express';
import { createAuthService, createSessionService, createUserService } from '../initservices';
import path from "path";
import { basePath } from '../appConsts';

const authService = createAuthService();
const sessionService = createSessionService();
const userService = createUserService();

const loginController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/login.html'));
}

const loginPostController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);
    const authenticated = await authService.authenticate(email, password);

    if (user && authenticated) {
        const session = await sessionService.createUserSession(user.id);
    
        res.cookie('sessionId', session.id, {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ message: 'Login successful' });

    } else {
        res.status(401).json({ message: 'Login failed' });
    }
}

export {
    loginController,
    loginPostController
}