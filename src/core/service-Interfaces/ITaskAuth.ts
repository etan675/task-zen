import { TaskDataContract } from "../../types/data-contracts/definitions";

interface ITaskAuth {
    canEdit(task: TaskDataContract, userId: number): boolean
}

export default ITaskAuth;