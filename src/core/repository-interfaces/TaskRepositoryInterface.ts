import { TaskDataContract } from "../../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../../types/definitions";

interface TaskRepositoryInterface {
    createTask(task: string): Promise<TaskDataContract|undefined>,
    getTasks(): Promise<TaskDataContract[]>,
    editTask(id: number, updateFields: TaskUpdateSchema): Promise<TaskDataContract|undefined>,
    deleteTask(id: number): Promise<number>,
}

export default TaskRepositoryInterface;