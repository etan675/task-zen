import { SessionDataContract } from "../../types/data-contracts/definitions";
import { SessionData } from "../../types/definitions";

interface ISessionRepo {
    createSession(userId: number, data: SessionData): Promise<SessionDataContract|undefined>
    deleteSession(id: number): Promise<number|undefined>
    getById(id: number): Promise<SessionDataContract|undefined>
}

export default ISessionRepo;