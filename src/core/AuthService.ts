import UserServiceInterface from "./service-Interfaces/UserSeriviceInterface";

class AuthService {
    private userService: UserServiceInterface;

    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    authenticate(email: string, password: string) {
        console.log('email: ', email);
        console.log('password: ', password);

        return true;
    }
}

export default AuthService;