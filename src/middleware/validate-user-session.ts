import { Response, NextFunction } from "express";
import { createSessionService } from "../init-services";
import { CustomRequest as Request } from "../types/definitions";

const sessionService = createSessionService();

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

    req.user = { id: session.userId, email: session.user.email };
    next();
}

export default validateUserSession;