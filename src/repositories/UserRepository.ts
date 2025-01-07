import { Pool } from "pg";
import UserRepositoryInterface from "../core/repository-interfaces/UserRepositoryInterface";
import { UserDataContract } from "../types/data-contracts/definitions";

class UserRepository implements UserRepositoryInterface {
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
            username: user.username,
            password: user.password
        };
    }
}

export default UserRepository;