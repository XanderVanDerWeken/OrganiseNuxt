import type { Board } from '~~/shared/models';

export default defineEventHandler(async (event) => {
    const { title } = event.context.params as { title: string };

    const titleDecoded = decodeURI(title);

    // TODO: Fetch board from database
    return {
        title: titleDecoded,
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
});