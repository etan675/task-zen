import { Request } from 'express';

type TaskUpdateSchema = {
    content?: string
    checked?: boolean
}

type RequestUserData = {
    id: number,
    email: string,
}

interface CustomRequest extends Request {
    user?: RequestUserData
}

export {
    TaskUpdateSchema,
    RequestUserData,
    CustomRequest
};

