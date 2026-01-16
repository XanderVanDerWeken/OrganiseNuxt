import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { resolve } from 'node:path';

const dbPath = resolve(process.cwd(), "dev.db");

console.log(dbPath);

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite);

// You can specify any property from the better-sqlite3 connection options
/*export const db = drizzle({
    connection: {
        source: process.env.DATABASE_URL,
    },
});*/
