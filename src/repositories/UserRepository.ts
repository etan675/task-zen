import { Pool } from "pg";
import UserRepositoryInterface from "../core/repository-interfaces/UserRepositoryInterface";
import { UserDataContract } from "../types/data-contracts/definitions";

class UserRepository implements UserRepositoryInterface {
    private db: Pool;

    constructor(dbClient: Pool) {
        this.db = dbClient;
    }

    async getByEmail(email: string): Promise<UserDataContract> {
        throw new Error("Method not implemented.");
    }
}

export default UserRepository;