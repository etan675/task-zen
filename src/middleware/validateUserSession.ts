import { Response, NextFunction } from "express";
import { createSessionService, createUserService } from "../initservices";
import { CustomRequest as Request } from "../types/definitions";

const sessionService = createSessionService();
const userService = createUserService();

const validateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        res.redirect('/login');
        return
    } 

    const session = await sessionService.getById(sessionId);

    if (!session) {
        res.status(401).json({ message: 'Invalid user session' });
        return;
    }

    const user = await userService.getById(session.userId);

    req.user = { id: user.id, email: user.email };
    next();
}

export default validateUserSession;