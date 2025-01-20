import { SessionDataContract } from "../../types/data-contracts/definitions";

interface SessionServiceInterface {
    createUserSession(userId: number): Promise<SessionDataContract>
    destroyUserSession(userId: number): Promise<void>
}

export default SessionServiceInterface;