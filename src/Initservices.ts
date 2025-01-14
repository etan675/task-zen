// DI registry

import db from "./db/db";
import TaskRepository from "./repositories/TaskRepository";
import TaskService from "./core/TaskService";
import UserRepository from "./repositories/UserRepository";
import UserService from "./core/UserService";
import AuthenticationService from "./core/AuthenticationService";
import TaskAuthorisationService from "./core/TaskAuthorisationService";

const createTasksService = () => {
    const taskRepository = new TaskRepository(db);
    const taskAuth = new TaskAuthorisationService();

    return new TaskService(taskRepository, taskAuth);
}

const createAuthService = () => {
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);

    return new AuthenticationService(userService);
}

export {
    createTasksService,
    createAuthService
}