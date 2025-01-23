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

    async createUser(email: string, password: string) {
        const existingUser = await this.getByEmail(email);
        if (existingUser) {
            throw new Error(`User already exists`);
        }

        const createdUser = await this.userRepository.createUser(email, password);
        if (!createdUser) {
            throw new Error('User creation failed');
        }

        return createdUser;
    }
}

export default UserService;