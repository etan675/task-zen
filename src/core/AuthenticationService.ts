import IUserService from "./service-Interfaces/IUserService";

class AuthenticationService {
    private userService: IUserService;

    constructor(userService: IUserService) {
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

export default AuthenticationService;