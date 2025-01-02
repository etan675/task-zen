import { UserDataContract } from "../../types/data-contracts/definitions";

interface UserRepositoryInterface {
    getByEmail(email: string): Promise<UserDataContract>;
}

export default UserRepositoryInterface;