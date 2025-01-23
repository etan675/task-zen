import { UserDataContract } from "../../types/data-contracts/definitions";

interface UserRepositoryInterface {
    getByEmail(email: string): Promise<UserDataContract|undefined>;
    getById(id: number): Promise<UserDataContract|undefined>;
    createUser(email: string, password: string): Promise<UserDataContract|undefined>
}

export default UserRepositoryInterface;