import { TaskUpdateSchema } from "../types/definitions";
import TaskRepositoryInterface from "./repository-interfaces/TaskRepositoryInterface";

class TasksService {
    private taskRepository: TaskRepositoryInterface;

    constructor(taskRepository: TaskRepositoryInterface) {
        this.taskRepository = taskRepository;
    }

    async createTask(content: string) {
        const createdTask = await this.taskRepository.createTask(content);

        if (!createdTask) {
            throw new Error('Failed to create task');
        }

        return createdTask;
    }

    async getTasks() {
        return await this.taskRepository.getTasks();
    }

    async editTask(id: number, updateFields: TaskUpdateSchema) {
        const editedTask = await this.taskRepository.editTask(id, updateFields);

        if (!editedTask) {
            throw new Error('Failed to edit task');
        }

        return editedTask;
    }

    async deleteTask(id: number) {
        const deletedTaskId = await this.taskRepository.deleteTask(id);

        if (!deletedTaskId) {
            throw new Error('Failed to delete task');
        }

        return deletedTaskId;
    }
}

export default TasksService;