import { Response } from "express";
import path from "path";
import { basePath } from "../app-consts";
import { CustomRequest as Request } from "../types/definitions";

const tasksPageController = (req: Request, res: Response) => {
    res.sendFile(path.join(basePath, '/views/tasks.html'));
}

export default tasksPageController;