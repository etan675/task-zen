// DI registry

import db from "./db/db";
import TaskRepository from "./repositories/TaskRepository";

import TasksService from "./services/TasksService";

const createTasksService = () => {
    const taskRepository = new TaskRepository(db);
    const tasksService = new TasksService(taskRepository);

    return tasksService;
}

export {
    createTasksService
}