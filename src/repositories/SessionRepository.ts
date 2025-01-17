import { Pool } from "pg";
import SessionRepositoryInterface from "../core/repository-interfaces/SessionRepositoryInterface";
import { SessionDataContract } from "../types/data-contracts/definitions";

class SessionRepository implements SessionRepositoryInterface {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async createSession(userId: number): Promise<SessionDataContract|undefined> {
        const query = `
            INSERT INTO "Session" ("userId")
            VALUES ($1)
            RETURNING *;
        `;

        const res = await this.db.query(query, [userId]);
        const session = res.rows[0];

        return session && {
            id: session.id,
            userId: session.userId
        }
    }

    async deleteSession(id: number): Promise<number> {
        const query = `
            DELETE FROM "Session" 
            WHERE "id" = $1
            RETURNING *;
        `;

        const res = await this.db.query(query, [id]);
        const deletedId = res.rows[0]?.id;

        return deletedId || 0;
    }

    async getById(id: number): Promise<SessionDataContract|undefined> {
        const query = `
            SELECT * FROM "Session" 
            WHERE "id" = $1;
        `;

        const res = await this.db.query(query, [id]);
        const session = res.rows[0];

        return session && {
            id: session.id,
            userId: session.userId
        }
    }
}

export default SessionRepository;