import { db } from "../db";
import { sessionTable } from "../db/schema";
import type { Session } from "./user.models";

export const sessionRepo = {
    async createSession(newSession: Session) {
        return await db
            .insert(sessionTable)
            .values(newSession);
    },
};
