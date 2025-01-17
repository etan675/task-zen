import { Request, Response, NextFunction } from "express";

const validateSession = (req: Request, res: Response, next: NextFunction) => {
    //TODO: implement

    next();
}

export default validateSession;