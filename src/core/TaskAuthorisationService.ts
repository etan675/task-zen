import { TaskDataContract } from "../types/data-contracts/definitions";

class TaskAuthorisationService {
    canEdit(task: TaskDataContract, userId: number): boolean {
        return task.userId === userId;
    }
}

export default TaskAuthorisationService;