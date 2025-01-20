import { SessionDataContract } from "../types/data-contracts/definitions";
import SessionRepositoryInterface from "./repository-interfaces/SessionRepositoryInterface";
import SessionServiceInterface from "./service-Interfaces/SessionServiceInterface";

class SessionService implements SessionServiceInterface {
    private sessionRepository: SessionRepositoryInterface;

    constructor(sessionRepository: SessionRepositoryInterface) {
        this.sessionRepository = sessionRepository;
    }

    async createUserSession(userId: number): Promise<SessionDataContract> {
        const session = await this.sessionRepository.createSession(userId);

        if (!session) {
            throw new Error('Failed to create session');
        }

        return session;
    }

    async destroyUserSession(userId: number): Promise<void> {
        try {
            await this.sessionRepository.deleteSession(userId);
        } catch {
            throw new Error("Failed to delete user session");
        }
    }

    async getById(sessionId: number) {
        return await this.sessionRepository.getById(sessionId);
    }
}

export default SessionService;