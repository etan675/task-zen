import { TaskDataContract } from "../types/data-contracts/definitions";
import ITaskAuth from "./service-Interfaces/ITaskAuth";

class TaskAuthorisationService implements ITaskAuth {
    canEdit(task: TaskDataContract, userId: number): boolean {
        return task.userId === userId;
    }
}

export default TaskAuthorisationService;