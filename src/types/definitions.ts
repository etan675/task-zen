import { Request } from 'express';

type TaskUpdateSchema = {
    content?: string
    checked?: boolean
}

type UserData = {
    id: number,
    email: string,
}

interface CustomRequest extends Request {
    user?: UserData
}

type SessionData = {
    user: {
        email: string
    }
}

export {
    TaskUpdateSchema,
    UserData,
    CustomRequest,
    SessionData
};

