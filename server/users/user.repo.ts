import { eq } from "drizzle-orm";
import { db } from "../db";
import { userTable } from "../db/schema";
import type { User } from "./user.models";

export const userRepo = {
    async createUser(newUser: User): Promise<User> {
        return await db
            .insert(userTable)
            .values({
                username: newUser.username,
                passwordHash: newUser.passwordHash,
            })
            .returning()
            .then(r => r[0]);
    },

    async getUserByUsername(username: string): Promise<User | null> {
        return await db
            .select()
            .from(userTable)
            .where(eq(userTable.username, username))
            .limit(1)
            .then(r => r[0]);
    },
};
