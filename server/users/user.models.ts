export interface User {
    id: number;
    username: string;
    passwordHash: string;
}

export interface Session {
    id: string;
    userId: number;
    expiresAt: Date;
}
