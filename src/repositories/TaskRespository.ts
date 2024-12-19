import TaskRepositoryContract from "../services/repository-interfaces/TaskRepositoryContract";
import { TaskDTO, TaskUpdateSchema } from "../types/task/definitions";

// in memory data for now
const data = [
    { id: 1, content: 'item 1', checked: false },
    { id: 2, content: 'item 2', checked: false },
    { id: 3, content: 'item 3', checked: false }
];

class TaskRepository implements TaskRepositoryContract {

    private getTaskIndex(id: number): number {
        return data.findIndex((task) => {
            return task.id === id;
        })
    }

    createTask(task: string): TaskDTO {
        const newTask = {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            content: task,
            checked: false
        }

        data.push(newTask);

        return { ...newTask };
    }

    getTasks(): TaskDTO[] {
        return [...data];
    }

    editTask(id: number, updateFields: TaskUpdateSchema): TaskDTO {
        const taskIndex = this.getTaskIndex(id);

        if (taskIndex === -1) {
            throw new Error(`task with id: ${id} not found`);
        }
    
        data[taskIndex] = { ...data[taskIndex], ...updateFields };

        return { ...data[taskIndex] };
    }

    deleteTask(id: number): number {
        const taskIndex = this.getTaskIndex(id);

        if (taskIndex === -1) {
            throw new Error(`task with id: ${id} not found`);
        }

        const taskId = data[taskIndex].id;

        data.splice(taskIndex, 1);

        return taskId;
    }
}

export default TaskRepository;