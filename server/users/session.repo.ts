import { eq } from "drizzle-orm";
import { db } from "../db";
import { sessionTable } from "../db/schema";
import type { Session } from "./user.models";

export const sessionRepo = {
  async createSession(newSession: Session): Promise<void> {
    await db.insert(sessionTable).values(newSession);
  },

  async removeSession(sessionId: string) {
    await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
  },
};
