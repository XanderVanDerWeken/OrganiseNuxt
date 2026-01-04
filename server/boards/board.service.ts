import type { Board, BoardOverview } from "~~/shared/models";

export async function getAllBoards(): Promise<BoardOverview[]> {
    // TODO: Fetch board overviews from database
    return [
        { title: 'Board 1' },
        { title: 'Board 2' },
        { title: 'Board 3' },
        { title: 'Board 4' },
    ] as BoardOverview[];
}

export async function getBoardByTitle(title: string): Promise<Board> {
    // TODO: Fetch board from database
    return {
        title: title,
        lists: [
            {
                title: "Todo",
                order: 1,
                cards: [
                    {
                        title: "Sample open Task",
                        description: "This is a sample task description.",
                        order: 1,
                    },
                    {
                        title: "Another open Task",
                        order: 2,
                    },
                ],
            },
            {
                title: "In Progress",
                order: 2,
                cards: [
                    {
                        title: "Sample in-progress Task",
                        description: "This task is currently being worked on.",
                        order: 1,
                    },
                ],
            },
            {
                title: "Done",
                order: 3,
                cards: [
                    {
                        title: "Sample completed Task",
                        description: "This task has been completed.",
                        order: 1,
                    },
                ],
            },
        ],
    } as Board;
}