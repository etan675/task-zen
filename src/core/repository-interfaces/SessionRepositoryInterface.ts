import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionRepositoryInterface {
    createSession(): Promise<SessionDataContract>
    deleteSession(id: number): Promise<number>
}

export default SessionRepositoryInterface;