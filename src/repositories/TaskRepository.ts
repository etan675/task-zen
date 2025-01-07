import TaskRepositoryInterface from "../core/repository-interfaces/TaskRepositoryInterface";
import { Pool } from "pg";
import { TaskDataContract } from "../types/data-contracts/definitions";
import { TaskUpdateSchema } from "../types/definitions";

class TaskRepository implements TaskRepositoryInterface {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async createTask(taskContent: string): Promise<TaskDataContract|undefined> {
        const query = 
            `INSERT INTO "Task" ("content", "checked") 
            VALUES ($1, $2) 
            RETURNING *;`;
        
        const res = await this.db.query(query, [taskContent, false]);
        const createdTask = res.rows[0];

        return createdTask && {
            id: createdTask.id,
            content: createdTask.content,
            checked: createdTask.checked
        }
    }

    async getTasks(): Promise<TaskDataContract[]> {
        const query = 'SELECT * FROM "Task" ORDER BY "id" ASC;'

        const res = await this.db.query(query);
        const tasks = res.rows.map(row => {
            return { 
                id: row.id,
                content: row.content,
                checked: row.checked
            };
        })

        return tasks;
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
            checked: editedTask.checked
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