import { prisma } from '~~/server/utils/prisma';
import type { Board } from './board.models';

export const boardRepo = {
    async findAllOverviews(): Promise<Board[]> {
        const boards = await prisma.board.findMany({
            select: {
                id: true,
                title: true,
            },
        });

        return boards.map(b => ({
            id: b.id,
            title: b.title,
        }));
    },

    async findByTitle(title: string): Promise<Board | null> {
        // TODO: Change to findUnique when title is unique
        const board = await prisma.board.findFirst({
            where: {
                title: title,
            },
            include: {
                lists: {
                    include: {
                        cards: {
                            orderBy: {
                                order: 'asc',
                            },
                        },
                    },
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        });
        
        if (!board)
            return null;

        return {
            id: board.id,
            title: board.title,
            lists: board.lists.map(l => ({
                id: l.id,
                title: l.title,
                order: l.order,
                cards: l.cards.map(c => ({
                    id: c.id,
                    title: c.title,
                    description: c.description || undefined,
                    order: c.order,
                })),
            })),
        };
    },

    async create(title: string): Promise<Board> {
        const board = await prisma.board.create({
            data: {
                title: title,
            },
        });

        return {
            id: board.id,
            title: board.title,
        };
    },
}