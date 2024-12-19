import { TaskDTO, TaskUpdateSchema } from "../../types/task/definitions";

interface TaskRepositoryContract {
    createTask(task: string): TaskDTO,
    getTasks(): TaskDTO[],
    editTask(id: number, updateFields: TaskUpdateSchema): TaskDTO,
    deleteTask(id: number): number,
}

export default TaskRepositoryContract;