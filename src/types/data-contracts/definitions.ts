type TaskDataContract = {
    id: number,
    content: string,
    checked: boolean,
    userId: number,
}

type UserDataContract = {
    id: number,
    email: string,
    username: string,
    password: string
}

export {
    TaskDataContract,
    UserDataContract
}