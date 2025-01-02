type TaskDataContract = {
    id: number,
    content: string,
    checked: boolean
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