import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionRepositoryInterface {
    createSession(userId: number): Promise<SessionDataContract|undefined>
    deleteSession(id: number): Promise<number>
    getById(id: number): Promise<SessionDataContract|undefined>
}

export default SessionRepositoryInterface;