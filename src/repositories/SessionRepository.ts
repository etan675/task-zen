import { Pool } from "pg";
import SessionRepositoryInterface from "../core/repository-interfaces/SessionRepositoryInterface";
import { SessionDataContract } from "../types/data-contracts/definitions";

class SessionRepository implements SessionRepositoryInterface {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async createSession(): Promise<SessionDataContract> {
        const query = `
            INSERT INTO "Session"
            DEFAULT VALUES 
            RETURNING *;
        `;

        const res = await this.db.query(query);
        const session = res.rows[0];

        return session && {
            id: session.id
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
}

export default SessionRepository;