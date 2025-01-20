import { Response, NextFunction } from "express";
import { createSessionService, createUserService } from "../init-services";
import { CustomRequest as Request } from "../types/definitions";

const sessionService = createSessionService();
const userService = createUserService();

const handleUnauthorisedResponse = (req: Request, res: Response) => {
    if (req.path.startsWith('/api')) {
        res.status(401).json({ message: 'Session expired' });

    } else {
        res.redirect('/login');
    }
}

const validateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies.sessionId;
    
    if (!sessionId) {
        handleUnauthorisedResponse(req, res);
        return;
    } 

    const session = await sessionService.getById(sessionId);

    if (!session) {
        handleUnauthorisedResponse(req, res);
        return;
    }

    const user = await userService.getById(session.userId);

    req.user = { id: user.id, email: user.email };
    next();
}

export default validateUserSession;