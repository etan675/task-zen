import { TaskDataContract } from "../../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../../types/definitions";

interface TaskRepositoryInterface {
    createTask(task: string): Promise<TaskDataContract>,
    getTasks(): Promise<TaskDataContract[]>,
    editTask(id: number, updateFields: TaskUpdateSchema): Promise<TaskDataContract>,
    deleteTask(id: number): Promise<number>,
}

export default TaskRepositoryInterface;