import { Pool } from "pg";
import ISessionRepo from "../core/repository-interfaces/ISessionRepo";
import { SessionDataContract } from "../types/data-contracts/definitions";
import { SessionData } from "../types/definitions";

class SessionRepository implements ISessionRepo {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async createSession(userId: number, data: SessionData): Promise<SessionDataContract|undefined> {
        const query = `
            INSERT INTO "Session" ("userId", "sessionData")
            VALUES ($1, $2)
            RETURNING *;
        `;

        const res = await this.db.query(query, [userId, data]);
        const session = res.rows[0];

        return session && {
            id: session.id,
            userId: session.userId,
            user: {
                email: session.sessionData.user.email
            }
        }
    }

    async deleteSession(id: number): Promise<void> {
        const query = `
            DELETE FROM "Session" 
            WHERE "id" = $1;
        `;

        await this.db.query(query, [id]);
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
            userId: session.userId,
            user: {
                email: session.sessionData.user.email
            }
        }
    }
}

export default SessionRepository;