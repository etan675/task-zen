import AuthenticationService from "../../src/core/AuthenticationService"
import IUserService from "../../src/core/service-Interfaces/IUserService";
import { UserDataContract } from "../../src/types/data-contracts/definitions";


const mockUserService: jest.Mocked<IUserService> = {
    getByEmail: jest.fn(),
    getById: jest.fn(),
    createUser: jest.fn(),
}

const createAuthService = () => {
    return new AuthenticationService(mockUserService);
}

// test data
const existingUser: UserDataContract = {
    id: 1,
    email: 'test@test.com',
    password: '123',
} 

describe('authentication service tests', () => {

    describe('authenticate user', () => {
        test('ok', async () => {
            const sut = createAuthService();
            const { email, password } = existingUser;
            // valid user
            mockUserService.getByEmail.mockResolvedValueOnce({ ...existingUser });

            const result = await sut.authenticate(email, password)

            expect(result).toBe(true);
        })
        
        test('invalid credentials', async () => {
            const sut = createAuthService();
            const email = 'xxx@xxx.com';
            const password = 'xxx';
            // user not found
            mockUserService.getByEmail.mockResolvedValueOnce(undefined);
            
            const result = await sut.authenticate(email, password);

            expect(result).toBe(false);
        })
    })    
})