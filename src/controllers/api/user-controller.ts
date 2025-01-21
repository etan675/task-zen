import { CustomRequest as Request } from "../../types/definitions";
import { Response } from "express";

const getLoggedInUserController = (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }
    
    res.json(req.user);
}

export {
    getLoggedInUserController
}