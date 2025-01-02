import UserRepositoryInterface from "./repository-interfaces/UserRepositoryInterface";
import UserServiceInterface from "./service-Interfaces/UserSeriviceInterface";

class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getByEmail(email: string) {
        return await this.userRepository.getByEmail(email);
    }
}

export default UserService;