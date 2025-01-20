import { Response, NextFunction } from "express";
import { createSessionService, createUserService } from "../init-services";
import { CustomRequest as Request } from "../types/definitions";

const sessionService = createSessionService();
const userService = createUserService();

const validateUserSession = async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = req.cookies.sessionId;

    if (!sessionId) {
        //TODO: redirect to login page if the request comes from
        // a page load (cannot return json to page requests)

        res.status(401).json({ message: 'Session expired' });
        return;
    } 

    const session = await sessionService.getById(sessionId);

    if (!session) {
        res.status(401).json({ message: 'Session expired' });
        return;
    }

    const user = await userService.getById(session.userId);

    req.user = { id: user.id, email: user.email };
    next();
}

export default validateUserSession;