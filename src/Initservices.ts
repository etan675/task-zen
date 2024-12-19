// DI registry

import TaskRepository from "./repositories/TaskRespository"
import TasksService from "./services/TasksService";

const createTasksService = () => {
    const taskRepository = new TaskRepository();
    const tasksService = new TasksService(taskRepository);

    return tasksService;
}

export {
    createTasksService
}