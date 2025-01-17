import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionServiceInterface {
    createSession(): Promise<SessionDataContract>
    destroySession(sid: number): Promise<number>
}

export default SessionServiceInterface;