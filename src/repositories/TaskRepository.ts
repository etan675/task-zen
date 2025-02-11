import ITaskRepo from "../core/repository-interfaces/ITaskRepo";
import { Pool } from "pg";
import { TaskDataContract } from "../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../types/definitions";

class TaskRepository implements ITaskRepo {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async createTask(userId: number, taskContent: string): Promise<TaskDataContract|undefined> {
        const query = 
            `INSERT INTO "Task" ("content", "checked", "userId") 
            VALUES ($1, $2, $3)
            RETURNING *;`;
        
        const res = await this.db.query(query, [taskContent, false, userId]);
        const createdTask = res.rows[0];

        return createdTask && {
            id: createdTask.id,
            content: createdTask.content,
            checked: createdTask.checked,
            userId: createdTask.userId
        }
    }

    async getTasks(userId: number): Promise<TaskDataContract[]> {
        const query = 
            `SELECT * FROM "Task" 
            WHERE "userId" = $1
            ORDER BY "id" ASC`;

        const res = await this.db.query(query, [userId]);
        const tasks = res.rows.map(row => {
            return { 
                id: row.id,
                content: row.content,
                checked: row.checked,
                userId: row.userId
            };
        })

        return tasks;
    }

    async getTask(id: number): Promise<TaskDataContract|undefined> {
        const query = 
            `SELECT * FROM "Task" 
            WHERE "id" = $1`;

        const res = await this.db.query(query, [id]);
        const task = res.rows[0];

        return task && {
            id: task.id,
            content: task.content,
            checked: task.checked,
            userId: task.userId
        }
    }

    async editTask(id: number, updateFields: TaskUpdateSchema): Promise<TaskDataContract|undefined> {
        const query = 
            `UPDATE "Task"
            SET
                "content" = coalesce($1, "content"),
                "checked" = coalesce($2, "checked")
            WHERE
                "id" = $3
            RETURNING *;`;

        const contentField = updateFields.content;
        const checkedField = updateFields.checked;

        const res = await this.db.query(query, [contentField, checkedField, id]);
        const editedTask = res.rows[0];

        return editedTask && { 
            id: editedTask.id,
            content: editedTask.content,
            checked: editedTask.checked,
            userId: editedTask.userId
        };
    }

    async deleteTask(id: number): Promise<number> {
        const query = `DELETE FROM "Task" WHERE "id" = $1 RETURNING *;`;

        const res = await this.db.query(query, [id]);
        const deletedTask = res.rows[0];

        return deletedTask?.id || 0;
    }
}

export default TaskRepository;