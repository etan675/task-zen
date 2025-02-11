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

    async destroySession(sessionId: number): Promise<void> {
        try {
            await this.sessionRepository.deleteSession(sessionId);
        } catch {
            throw new Error("Failed to delete user's session");
        }
    }

    async getById(sessionId: number) {
        return await this.sessionRepository.getById(sessionId);
    }
}

export default SessionService;