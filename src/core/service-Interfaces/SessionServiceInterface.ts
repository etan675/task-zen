import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionServiceInterface {
    createUserSession(userId: number): Promise<SessionDataContract>
    destroySession(sessionId: number): Promise<void>
}

export default SessionServiceInterface;