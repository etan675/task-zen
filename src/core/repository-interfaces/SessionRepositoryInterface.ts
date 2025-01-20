import { SessionDataContract } from "../../types/data-contracts/definitions";
import { SessionData } from "../../types/definitions";

interface SessionRepositoryInterface {
    createSession(userId: number, data: SessionData): Promise<SessionDataContract|undefined>
    deleteSession(id: number): Promise<void>
    getById(id: number): Promise<SessionDataContract|undefined>
}

export default SessionRepositoryInterface;