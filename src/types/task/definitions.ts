type TaskDTO = {
    id: number,
    content: string,
    checked: boolean
}

type TaskUpdateSchema = {
    content?: string,
    checked?: boolean
}

export {
    TaskDTO,
    TaskUpdateSchema
}