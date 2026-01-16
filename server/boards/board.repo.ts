import { prisma } from '~~/server/utils/prisma';
import type { Board } from './board.models';
import type { PutBoardDTO, PutCardDTO, PutListDTO } from '~~/shared/models';

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
        const board = await prisma.board.findUnique({
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

    async update(updatedBoard: PutBoardDTO): Promise<Board> {
        const listIds = updatedBoard.lists
            ?.filter((l: PutListDTO) => l.id)
            .map((l: PutListDTO) => l.id) ?? [];
        
        const cardIds = updatedBoard.lists
            ?.flatMap((l: PutListDTO) => l.cards ?? [])
            .filter((c: PutCardDTO) => c.id)
            .map((c: PutCardDTO) => c.id) ?? [];
        
        const board = await prisma.board.upsert({
            where: { title: updatedBoard.title },
            create: {
                title: updatedBoard.title,
                lists: {
                    create: updatedBoard.lists.map((list: PutListDTO) => ({
                        title: list.title,
                        order: list.order,
                        cards: {
                            create: list.cards.map((card: PutCardDTO) => ({
                                title: card.title,
                                description: card.description,
                                order: card.order,
                            })),
                        },
                    })),
                },
            },
            update: {
                title: updatedBoard.title,
                lists: {
                    upsert: updatedBoard.lists.map((list: PutListDTO) => ({
                        where: { id: list.id ?? -1 },
                        create: {
                            title: list.title,
                            order: list.order,
                            
                            cards: {
                                create: list.cards.map((card: PutCardDTO) => ({
                                    title: card.title,
                                    description: card.description,
                                    order: card.order,
                                })),
                            },
                        },
                        update: {
                            title: list.title,
                            order: list.order,

                            cards: {
                                upsert: list.cards.map((card: PutCardDTO) => ({
                                    where: { id: card.id ?? -1, },

                                    create: {
                                        title: card.title,
                                        description: card.description,
                                        order: card.order,
                                    },

                                    update: {
                                        title: card.title,
                                        description: card.description,
                                        order: card.order,
                                    },
                                })),
                            },
                        },
                    })),
                },
            },

            include: {
                lists: {
                    orderBy: { order: 'asc' },
                    include: {
                        cards: {
                            orderBy: {
                                order: 'asc',
                            },
                        },
                    },
                },
            },
        });

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
    }
}