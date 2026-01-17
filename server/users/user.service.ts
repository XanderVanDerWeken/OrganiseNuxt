import bcrypt from 'bcrypt';
import { userRepo } from './user.repo';
import { sessionRepo } from './session.repo';
import type { Session } from './user.models';

export async function signupUserFlow(username: string, password: string): Promise<boolean> {
    // Validate Input

    // Check Username Uniqueness
    if (await userRepo.chechUsernameExists(username)) {
        return false;
    }

    // Hash Password
    const passwordHash = await hashPassword(password);

    // Insert User
    const newUser = await userRepo.createUser({
        id: -1,
        username: username,
        passwordHash: passwordHash,
    });

    // Create Session
    const session: Session = {
        id: createSessionId(),
        userId: newUser.id,
        expiresAt: createExpiryDate(),
    };

    sessionRepo.createSession(session);

    // Set cookie

    // Return Success
    return true;
}

async function loginUserFlow(username: string, password: string): Promise<boolean> {
    // Find User by Username

    // Compare Passwords

    // If invalid reject
    return false;

    // Create new Session

    // Set cookie

    // Return Success
    return true;
}

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

/*async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}*/

function createSessionId(): string {
    return crypto.randomUUID();
}

function createExpiryDate(): Date {
    const fiveMinutes = 5 * 60;

    const expiry = new Date();
    expiry.setDate(expiry.getMinutes() + fiveMinutes);

    return expiry;
}
