import { Pool } from "pg";
import IUserRepo from "../core/repository-interfaces/IUserRepo";
import { UserDataContract } from "../types/data-contracts/definitions";

class UserRepository implements IUserRepo {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async getByEmail(email: string): Promise<UserDataContract|undefined> {
        const query = `SELECT * FROM "User" WHERE "email" = $1;`;

        const res = await this.db.query(query, [email]);
        const user = res.rows[0];

        return user && {
            id: user.id,
            email: user.email,
            password: user.password
        };
    }

    async getById(id: number): Promise<UserDataContract|undefined> {
        const query = `
            SELECT * FROM "User" 
            WHERE "id" = $1;
        `;

        const res = await this.db.query(query, [id]);
        const user = res.rows[0];

        return user && {
            id: user.id,
            email: user.email,
            password: user.password
        }
    }

    async createUser(email: string, password: string): Promise<UserDataContract|undefined> {
        const query = `
            INSERT INTO "User" ("email", "password")
            VALUES ($1, $2)
            RETURNING *;
        `;

        const res = await this.db.query(query, [email, password]);
        const user = res.rows[0];

        return user && {
            id: user.id,
            email: user.email,
            password: user.password
        }
    }
}

export default UserRepository;