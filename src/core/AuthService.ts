import UserServiceInterface from "./service-Interfaces/UserServiceInterface";

class AuthService {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    async authenticate(email: string, password: string) {
        const user = await this.userService.getByEmail(email);
        
        if (!user) {
            return false;            
        }

        return (
            user.email === email &&
            user.password === password
        )
    }
}

export default AuthService;