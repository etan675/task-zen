import UserRepositoryInterface from "./repository-interfaces/UserRepositoryInterface";
import UserServiceInterface from "./service-Interfaces/UserServiceInterface";

class UserService implements UserServiceInterface {
    private userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async getByEmail(email: string) {
        return await this.userRepository.getByEmail(email.trim());
    }

    async getById(userId: number) {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
}

export default UserService;