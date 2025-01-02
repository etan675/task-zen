// DI registry

import db from "./db/db";
import TaskRepository from "./repositories/TaskRepository";
import TasksService from "./core/TasksService";
import UserRepository from "./repositories/UserRepository";
import UserService from "./core/UserService";
import AuthService from "./core/AuthService";

const createTasksService = () => {
    const taskRepository = new TaskRepository(db);

    return new TasksService(taskRepository);
}

const createAuthService = () => {
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);

    return new AuthService(userService);
}

export {
    createTasksService,
    createAuthService
}