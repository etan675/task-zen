import { TaskUpdateSchema } from "../types/task/definitions";
import TaskRepositoryContract from "./repository-interfaces/TaskRepositoryContract";

class TasksService {
    private taskRepository: TaskRepositoryContract;

    constructor(taskRepository: TaskRepositoryContract) {
        this.taskRepository = taskRepository;
    }

    createTask(newTask: string) {
        return this.taskRepository.createTask(newTask);
    }

    getTasks() {
        return this.taskRepository.getTasks();
    }

    editTask(id: number, updateFields: TaskUpdateSchema) {
        return this.taskRepository.editTask(id, updateFields);
    }

    deleteTask(id: number) {
        return this.taskRepository.deleteTask(id);
    }
}

export default TasksService;