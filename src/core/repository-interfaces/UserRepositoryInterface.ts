import { UserDataContract } from "../../types/data-contracts/definitions";

interface UserRepositoryInterface {
    getByEmail(email: string): Promise<UserDataContract|undefined>;
}

export default UserRepositoryInterface;