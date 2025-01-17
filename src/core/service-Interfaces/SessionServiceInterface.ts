import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionServiceInterface {
    createUserSession(userId: number): Promise<SessionDataContract>
    destroySession(sid: number): Promise<number>
}

export default SessionServiceInterface;