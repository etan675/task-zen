import { TaskDataContract } from "../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../types/definitions";
import ITaskRepo from "./repository-interfaces/ITaskRepo";
import TaskAuthorisationService from "./TaskAuthorisationService";

class TaskService {
    private taskRepository: ITaskRepo;
    private taskAuthorisation: TaskAuthorisationService

    constructor(
        taskRepository: ITaskRepo,
        taskAuthorisation: TaskAuthorisationService
    ) {
        this.taskRepository = taskRepository;
        this.taskAuthorisation = taskAuthorisation;
    }

    private async getTask(taskId: number): Promise<TaskDataContract> {
        const task = await this.taskRepository.getTask(taskId);

        if (!task) {
            throw new Error('Task does not exist');
        }

        return task;
    }

    async createUserTask(userId: number, content: string) {
        const createdTask = await this.taskRepository.createTask(userId, content);

        if (!createdTask) {
            throw new Error('Failed to create task');
        }

        return createdTask;
    }

    async getUserTasks(userId: number) {
        return await this.taskRepository.getTasks(userId);
    }

    async editUserTask(taskId: number, userId: number, updateFields: TaskUpdateSchema) {
        const task = await this.getTask(taskId);

        if (!this.taskAuthorisation.canEdit(task, userId)) {
            throw new Error('User cannot edit this task');
        }

        const editedTask = await this.taskRepository.editTask(taskId, updateFields);

        if (!editedTask) {
            throw new Error('Failed to edit task');
        }

        return editedTask;
    }

    async deleteUserTask(taskId: number, userId: number) {
        const task = await this.getTask(taskId);

        if (!this.taskAuthorisation.canEdit(task, userId)) {
            throw new Error('User cannot delete this task');
        }

        const deletedTaskId = await this.taskRepository.deleteTask(taskId);

        if (!deletedTaskId) {
            throw new Error('Failed to delete task');
        }

        return deletedTaskId;
    }
}

export default TaskService;