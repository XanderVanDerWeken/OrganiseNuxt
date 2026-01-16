import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { resolve } from 'node:path';

const dbPath = resolve(process.cwd(), 'dev.db');

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);
