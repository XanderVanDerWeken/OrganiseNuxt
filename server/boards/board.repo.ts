import { and, eq, inArray, notInArray } from 'drizzle-orm';
import { db } from '../db/index';
import { boardTable, cardTable, listTable } from '../db/schema';
import type { Board } from './board.models';
import type { BoardInput } from '~~/shared/models';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

export const boardRepo = {
    async findAllOverviews(): Promise<Board[]> {
        return await db
            .select({
                id: boardTable.id,
                title: boardTable.title,
            })
            .from(boardTable);
    },

    async findByTitle(title: string): Promise<Board | null> {
        const board = await db
            .select()
            .from(boardTable)
            .where(eq(boardTable.title, title))
            .limit(1)
            .then(r => r[0]);

        if (!board) return null;

        const boardLists = await db
            .select()
            .from(listTable)
            .where(eq(listTable.boardId, board.id))
            .orderBy(listTable.order);

        const listIds = boardLists.map(l => l.id);

        const boardCards = listIds.length === 0
            ? []
            : await db
                .select()
                .from(cardTable)
                .where(inArray(cardTable.listId, listIds))
                .orderBy(cardTable.order);

        return {
            ...board,
            lists: boardLists.map(l => ({
                ...l,
                cards: boardCards.filter(c => c.listId === l.id)
                    .map(c => ({
                        ...c,
                        description: c.description ?? undefined,
                    })),
            })),
        };
    },

    async update(input: BoardInput): Promise<Board> {
        await db.transaction(async (tx) => {
            // Board upsert
            await upsertBoard(tx, input);

            // List upsert
            await upsertLists(tx, input);

            // Lists cleanup
            await cleanupLists(tx, input);

            // Cards upsert
            await upsertCards(tx, input);

            // Cards cleanup
            await cleanupCards(tx, input);
        });

        return (await this.findByTitle(input.title))!
    }
}

type DbTx = BetterSQLite3Database;

async function upsertBoard(tx: DbTx, input: BoardInput) {
    await tx
        .insert(boardTable)
        .values({
            id: input.id,
            title: input.title,
        })
        .onConflictDoUpdate({
            target: boardTable.id,
            set: {
                title: input.title,
            },
        });
}

async function upsertLists(tx: DbTx, input: BoardInput) {
    for (const list of input.lists) {
        await tx
            .insert(listTable)
            .values({
                id: list.id,
                boardId: input.id,
                title: list.title,
                order: list.order,
            })
            .onConflictDoUpdate({
                target: listTable.id,
                set: {
                    title: list.title,
                    order: list.order,
                }
            })
    }
}

async function cleanupLists(tx: DbTx, input: BoardInput) {
    const listIds = input.lists.map(l => l.id);
    await tx.delete(listTable).where(
        and(
            eq(listTable.boardId, input.id),
            notInArray(listTable.id, listIds)
        )
    );
}

async function upsertCards(tx: DbTx, input: BoardInput) {
    const allCards = input.lists.flatMap(l =>
        l.cards.map(c => ({
            id: c.id,
            listId: l.id,
            title: c.title,
            description: c.description,
            order: c.order
        }))
    );

    for (const card of allCards) {
        await tx
            .insert(cardTable)
            .values(card)
            .onConflictDoUpdate({
                target: cardTable.id,
                set: {
                    title: card.title,
                    description: card.description,
                    order: card.order,
                },
            });
    }
}

async function cleanupCards(tx: DbTx, input: BoardInput) {
    const listIds = input.lists.map(l => l.id);

    const allCards = input.lists.flatMap(l =>
        l.cards.map(c => ({
            id: c.id,
            listId: l.id,
            title: c.title,
            description: c.description,
            order: c.order
        }))
    );

    const cardIds = allCards.map(c => c.id);
    await tx.delete(cardTable).where(
        and(
            inArray(cardTable.listId, listIds),
            notInArray(cardTable.id, cardIds)
        )
    )
}
