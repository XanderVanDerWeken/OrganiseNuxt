import { prisma } from '~~/server/utils/prisma';

export const boardRepo = {
    findAll() {
        return prisma.board.findMany();
    },

    findByTitle(title: string) {
        // TODO: Change to findUnique when title is unique
        const board = prisma.board.findFirst({
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
        
        return board;
    },

    create(title: string) {
        return prisma.board.create({
            data: {
                title: title,
            },
        });
    },
}