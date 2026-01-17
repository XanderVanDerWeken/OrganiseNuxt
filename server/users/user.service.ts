import bcrypt from "bcrypt";
import { userRepo } from "./user.repo";
import { sessionRepo } from "./session.repo";
import type { Session, User } from "./user.models";

export async function tryCreateUser(
  username: string,
  password: string,
): Promise<User | null> {
  // Validate Input

  // Check Username Uniqueness
  if (await userRepo.chechUsernameExists(username)) {
    return null;
  }

  // Hash Password
  const passwordHash = await hashPassword(password);

  // Insert User
  return await userRepo.createUser({
    id: -1,
    username: username,
    passwordHash: passwordHash,
  });
}

export async function createSessionForUser(user: User): Promise<Session> {
  // Create Session
  const session: Session = {
    id: createSessionId(),
    userId: user.id,
    expiresAt: createExpiryDate(),
  };

  sessionRepo.createSession(session);

  return session;
}

export async function getUserByUsername(
  username: string,
): Promise<User | null> {
  return userRepo.getUserByUsername(username);
}

export async function checkUserCredentials(
  user: User,
  password: string,
): Promise<boolean> {
  return verifyPassword(password, user.passwordHash);
}

export async function deleteSession(sessionId: string): Promise<void> {
  await sessionRepo.removeSession(sessionId);
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function createSessionId(): string {
  return crypto.randomUUID();
}

function createExpiryDate(): Date {
  const fiveMinutes = 5 * 60;

  const expiry = new Date();
  expiry.setDate(expiry.getMinutes() + fiveMinutes);

  return expiry;
}
