import { SessionDataContract } from "../types/data-contracts/definitions";
import { UserData } from "../types/definitions";
import ISessionRepo from "./repository-interfaces/ISessionRepo";

class SessionService {
    private sessionRepository: ISessionRepo;

    constructor(sessionRepository: ISessionRepo) {
        this.sessionRepository = sessionRepository;
    }

    async createUserSession(user: UserData): Promise<SessionDataContract> {
        const sessionData = { user: { email: user.email } };
        const session = await this.sessionRepository.createSession(user.id, sessionData);

        if (!session) {
            throw new Error('Failed to create session');
        }

        return session;
    }

    async destroySession(sessionId: number): Promise<number> {
        const deletedId = await this.sessionRepository.deleteSession(sessionId);

        if (!deletedId) {
            throw new Error("Failed to delete user's session");
        }

        return deletedId;
    }

    async getById(sessionId: number) {
        return await this.sessionRepository.getById(sessionId);
    }
}

export default SessionService;