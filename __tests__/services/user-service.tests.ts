import IUserRepo from "../../src/core/repository-interfaces/IUserRepo";
import UserService from "../../src/core/UserService";
import { UserDataContract } from "../../src/types/data-contracts/definitions";

const mockUserRepo: jest.Mocked<IUserRepo> = {
    getByEmail: jest.fn(),
    getById: jest.fn(),
    createUser: jest.fn(),
};

const createUserService = () => {
    return new UserService(mockUserRepo);
}

// test data
const existingUser: UserDataContract = {
    id: 1,
    email: 'test@test.com',
    password: '123'
}

const newUser: UserDataContract = {
    id: 2,
    email: 'test2@test.com',
    password: '123'
}

describe('user service tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('get by email', () => {
        test('found', async () => {
            const sut = createUserService();
            const email = existingUser.email;
            mockUserRepo.getByEmail.mockResolvedValueOnce({ ...existingUser });
    
            const user = await sut.getByEmail(email);
    
            expect(user?.email).toBe(email);
        })  

        test('not found returns undefined', async () => {
            const sut = createUserService();
            const email = existingUser.email;
    
            const user = await sut.getByEmail(email);
    
            expect(user).toBe(undefined);
        })
    })

    test('get by id', async () => {
        const sut = createUserService();
        const id = existingUser.id;
        mockUserRepo.getById.mockResolvedValueOnce({ ...existingUser });

        const user = await sut.getById(id);

        expect(user.id).toBe(id);
    })

    describe('create user', () => {
        test('new user', async () => {
            const sut = createUserService();
            const { id, email, password } = newUser;
            mockUserRepo.createUser.mockResolvedValueOnce({ ...newUser });
    
            const createdUser = await sut.createUser(email, password);
    
            expect(createdUser.id).toBe(id);
        })  

        test('throws err if email already exists', async () => {
            const sut = createUserService();
            const { email, password } = existingUser;
            // found existing user data
            mockUserRepo.getByEmail.mockResolvedValueOnce({ ...existingUser });
            mockUserRepo.createUser.mockResolvedValueOnce({ ...existingUser });
    
            await expect(sut.createUser(email, password)).rejects.toThrow();
        })
    })
})