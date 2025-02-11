import ITaskRepo from "../../src/core/repository-interfaces/ITaskRepo";
import ITaskAuth from "../../src/core/service-Interfaces/ITaskAuth";
import TaskService from "../../src/core/TaskService"
import { TaskDataContract } from "../../src/types/data-contracts/definitions";

const mockTaskRepo: jest.Mocked<ITaskRepo> = {
    getTask: jest.fn(),
    createTask: jest.fn(),
    getTasks: jest.fn(),
    editTask: jest.fn(),
    deleteTask: jest.fn(),
}

const mockTaskAuth: jest.Mocked<ITaskAuth> = {
    canEdit: jest.fn(),
}

const createTaskService = () => {
    return new TaskService(mockTaskRepo, mockTaskAuth);
}

// test data
const existingTask: TaskDataContract = {
    id: 1,
    content: 'test',
    checked: false,
    userId: 1
}

const newTask: TaskDataContract = {
    id: 2,
    content: 'test2',
    checked: false,
    userId: 1
}

const editedTask: TaskDataContract = {
    ...existingTask,
    content: 'edited',
    checked: true,
}

describe('task service tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('get all', async () => {
        const sut = createTaskService();
        mockTaskRepo.getTasks.mockResolvedValueOnce([{ ...existingTask }]);
        
        const tasks = await sut.getUserTasks(existingTask.id);

        expect(tasks).toContainEqual({ ...existingTask });
    })

    test('create', async () => {;
        const sut = createTaskService();
        mockTaskRepo.createTask.mockResolvedValueOnce({ ...newTask });

        const createdTask = await sut.createUserTask(newTask.userId, newTask.content);

        expect(createdTask.content).toBe(newTask.content);
    }) 

    describe('edit', () => {
        test('ok', async () => {
            const sut = createTaskService();
    
            // get data
            mockTaskRepo.getTask.mockResolvedValueOnce({ ...existingTask });
            // update data
            mockTaskRepo.editTask.mockResolvedValueOnce({ ...editedTask });
            // user must be authorised
            mockTaskAuth.canEdit.mockReturnValueOnce(true);
    
            const edited = await sut.editUserTask(
                existingTask.id,
                existingTask.userId,
                { content: editedTask.content, checked: editedTask.checked }
            );
    
            expect(edited.content).toBe(editedTask.content);
        })

        test('throws error if unauthorised', async () => {
            const sut = createTaskService();
            mockTaskRepo.getTask.mockResolvedValueOnce({ ...existingTask });
            mockTaskRepo.editTask.mockResolvedValueOnce({ ...editedTask });
            // unauthorised to edit
            mockTaskAuth.canEdit.mockReturnValueOnce(false);
            const wrongUserId = 2;

            // should throw error
            await expect(sut.editUserTask(
                existingTask.id,
                wrongUserId,
                { content: editedTask.content, checked: editedTask.checked }
            )).rejects.toThrow();
        })
    })

    describe('delete', () => {
        test('ok', async () => {
            const sut = createTaskService();
            // get data
            mockTaskRepo.getTask.mockResolvedValueOnce({ ...existingTask });
            // delete data
            mockTaskRepo.deleteTask.mockResolvedValueOnce(existingTask.id);
            // user must be authorised
            mockTaskAuth.canEdit.mockReturnValueOnce(true);

            const deletedId = await sut.deleteUserTask(existingTask.id, existingTask.userId);

            expect(deletedId).toBe(existingTask.id);
        })

        test('throws error if unauthorised', async () => {
            const sut = createTaskService();
            mockTaskRepo.getTask.mockResolvedValueOnce({ ...existingTask });
            mockTaskRepo.deleteTask.mockResolvedValueOnce(existingTask.id);
            // unauthorised
            mockTaskAuth.canEdit.mockReturnValueOnce(false);

            await expect(sut.deleteUserTask(existingTask.id, existingTask.userId)).rejects.toThrow();
        })
    })
})