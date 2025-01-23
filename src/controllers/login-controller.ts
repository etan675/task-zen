import { Request, Response } from 'express';
import { createAuthService, createSessionService, createUserService } from '../init-services';

const authService = createAuthService();
const sessionService = createSessionService();
const userService = createUserService();

const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.getByEmail(email);
    const authenticated = await authService.authenticate(email, password);

    if (user && authenticated) {
        //TODO: implement session expiry & cookie persistence
        const userData = { id: user.id, email: user.email };
        const session = await sessionService.createUserSession(userData);
    
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

export default loginController