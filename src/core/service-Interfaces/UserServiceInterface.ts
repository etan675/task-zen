import { UserDataContract } from "../../types/data-contracts/definitions";

interface UserServiceInterface {
    getByEmail(email: string): Promise<UserDataContract|undefined>
}

export default UserServiceInterface;