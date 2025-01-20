import { Response } from 'express';
import { createSessionService } from '../init-services';
import { CustomRequest as Request } from '../types/definitions';

const sessionService = createSessionService();

const logoutController = async (req: Request, res: Response) => {
    if (req.cookies.sessionId) {
        await sessionService.destroySession(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.json({ message: 'User logged out' });
}

export default logoutController;