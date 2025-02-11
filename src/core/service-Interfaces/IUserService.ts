import { UserDataContract } from "../../types/data-contracts/definitions";

interface IUserService {
    getByEmail(email: string): Promise<UserDataContract|undefined>
    getById(id: number): Promise<UserDataContract>
    createUser(email: string, password: string): Promise<UserDataContract>
}

export default IUserService;