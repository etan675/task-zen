type TaskDataContract = {
    id: number,
    content: string,
    checked: boolean,
    userId: number,
}

type UserDataContract = {
    id: number,
    email: string,
    password: string
}

type SessionDataContract = {
    id: number,
    userId: number
}

export {
    TaskDataContract,
    UserDataContract,
    SessionDataContract
}