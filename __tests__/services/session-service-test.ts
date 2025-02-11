import ISessionRepo from "../../src/core/repository-interfaces/ISessionRepo";
import SessionService from "../../src/core/SessionService"
import { SessionDataContract } from "../../src/types/data-contracts/definitions";
import { UserData } from "../../src/types/definitions";

const mockSessionRepo: jest.Mocked<ISessionRepo> = {
    createSession: jest.fn(),
    deleteSession: jest.fn(),
    getById: jest.fn(),
}

const createSessionService = () => {
    return new SessionService(mockSessionRepo);
}

// test data
const session: SessionDataContract = {
    id: 1,
    userId: 1,
    user: { email: 'test@test.com' }
}

describe('session service tests', () => {
    test('create user session', async () => {
        const sut = createSessionService();
        const user: UserData = { id: 1, email: 'test@test.com' };
        mockSessionRepo.createSession.mockResolvedValueOnce({ ...session });

        const userSession = await sut.createUserSession(user);

        expect(userSession.userId).toBe(user.id);
    })

    describe('destroy user session', () => {
        test('ok', async () => {
            const sut = createSessionService();
            const sessionId = session.id;
            mockSessionRepo.deleteSession.mockResolvedValueOnce(sessionId);
    
            const deletedId = await sut.destroySession(sessionId);

            expect(deletedId).toBe(sessionId);
        })

        test("throws err if session doesn't exist", async () => {
            const sut = createSessionService();
            const wrongSessionId = 2;
            mockSessionRepo.deleteSession.mockResolvedValueOnce(undefined);

            await expect(sut.destroySession(wrongSessionId)).rejects.toThrow();
        })
    })

    test('get by id', async () => {
        const sut = createSessionService();
        const sessionId = session.id;
        mockSessionRepo.getById.mockResolvedValueOnce({ ...session });

        const _session = await sut.getById(sessionId);

        expect(_session?.id).toBe(sessionId);
    })
})