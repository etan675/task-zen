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

    //TODO: implement log out using this fn
    async destroySession(sid: number): Promise<number> {
        const deletedSid = await this.sessionRepository.deleteSession(sid);

        if (!deletedSid) {
            throw new Error("Failed to delete session");
        }

        return deletedSid;
    }

    async getById(sessionId: number) {
        return await this.sessionRepository.getById(sessionId);
    }
}

export default SessionService;