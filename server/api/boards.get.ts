import type { BoardOverview } from "~~/shared/models";

export default defineEventHandler(async () => {
    // TODO: Fetch board overviews from database
    return [
        { title: 'Board 1' },
        { title: 'Board 2' },
        { title: 'Board 3' },
    ] as BoardOverview[];
});