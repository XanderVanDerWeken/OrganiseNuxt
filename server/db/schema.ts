import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const boardTable = sqliteTable('boards', {
    id: integer({ mode: 'number' })
        .primaryKey({ autoIncrement: true }),
    title: text()
        .unique()
        .notNull(),
});

export const listTable = sqliteTable('lists', {
    id: integer({ mode: 'number' })
        .primaryKey({ autoIncrement: true }),
    boardId: integer('board_id', { mode: 'number' })
        .references(() => boardTable.id, { onDelete: 'cascade' })
        .notNull(),
    title: text()
        .notNull(),
    order: integer({ mode: 'number' })
        .notNull(),
});

export const cardTable = sqliteTable('cards', {
    id: integer({ mode: 'number' })
        .primaryKey({ autoIncrement: true }),
    listId: integer('list_id', { mode: 'number' })
        .references(() => listTable.id, { onDelete: 'cascade' })
        .notNull(),
    title: text()
        .notNull(),
    description: text(),
    order: integer({ mode: 'number' })
        .notNull(),
});

export const userTable = sqliteTable('users', {
    id: integer({ mode: 'number' })
        .primaryKey({ autoIncrement: true }),
    username: text()
        .unique()
        .notNull(),
    passwordHash: text()
        .notNull(),
});
