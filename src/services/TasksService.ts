import { TaskUpdateSchema } from "../types/definitions";
import TaskRepositoryInterface from "./repository-interfaces/TaskRepositoryInterface";

class TasksService {
    private taskRepository: TaskRepositoryInterface;

    constructor(taskRepository: TaskRepositoryInterface) {
        this.taskRepository = taskRepository;
    }

    async createTask(newTask: string) {
        try {
            return await this.taskRepository.createTask(newTask);

        } catch (err) {
            console.log(err.message);
            throw new Error('Failed to create task');
        }
    }

    async getTasks() {
        try {
            return await this.taskRepository.getTasks();

        } catch (err) {
            console.log(err.message);
            throw new Error('Failed to get tasks');
        }
    }

    async editTask(id: number, updateFields: TaskUpdateSchema) {
        try {
            return await this.taskRepository.editTask(id, updateFields);

        } catch (err) {
            console.log(err.message);
            throw new Error('Failed to edit task');
        }
    }

    async deleteTask(id: number) {
        try {
            return this.taskRepository.deleteTask(id);

        } catch (err) {
            console.log(err.message);
            throw new Error('Failed to delete task');
        }
    }
}

export default TasksService;