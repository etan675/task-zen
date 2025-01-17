// DI registry

import db from "./db/db";
import TaskRepository from "./repositories/TaskRepository";
import TaskService from "./core/TaskService";
import UserRepository from "./repositories/UserRepository";
import UserService from "./core/UserService";
import AuthenticationService from "./core/AuthenticationService";
import TaskAuthorisationService from "./core/TaskAuthorisationService";
import SessionRepository from "./repositories/SessionRepository";
import SessionService from "./core/SessionService";

const createTasksAuthService = () => {
    return new TaskAuthorisationService();
}

const createTasksService = () => {
    const taskRepository = new TaskRepository(db);
    const taskAuth = createTasksAuthService();
    return new TaskService(taskRepository, taskAuth);
}

const createUserService = () => {
    const userRepository = new UserRepository(db);
    return new UserService(userRepository);
}

const createAuthService = () => {
    const userService = createUserService();
    return new AuthenticationService(userService);
}

const createSessionService = () => {
    const sessionRepository = new SessionRepository(db);
    return new SessionService(sessionRepository);
}

export {
    createTasksService,
    createAuthService,
    createSessionService
}