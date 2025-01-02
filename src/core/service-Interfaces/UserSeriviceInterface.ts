import { UserDataContract } from "../../types/data-contracts/definitions";

interface UserServiceInterface {
    getByEmail(email: string): Promise<UserDataContract>
}

export default UserServiceInterface;