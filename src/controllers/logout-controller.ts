import { Response } from 'express';
import { createSessionService } from '../init-services';
import { CustomRequest as Request } from '../types/definitions';

const sessionService = createSessionService();

const logoutController = async (req: Request, res: Response) => {
    if (req.user) {
        await sessionService.destroyUserSession(req.user.id);
    }

    res.clearCookie('sessionId');
    res.json({ message: 'User logged out' });
}

export default logoutController;