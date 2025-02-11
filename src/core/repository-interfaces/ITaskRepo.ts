import { TaskDataContract } from "../../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../../types/definitions";

interface ITaskRepo {
    createTask(userId: number, content: string): Promise<TaskDataContract|undefined>,
    getTasks(userId: number): Promise<TaskDataContract[]>,
    getTask(id: number): Promise<TaskDataContract|undefined>
    editTask(id: number, updateFields: TaskUpdateSchema): Promise<TaskDataContract|undefined>,
    deleteTask(id: number): Promise<number>,
}

export default ITaskRepo;