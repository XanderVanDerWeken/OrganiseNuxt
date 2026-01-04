import { getBoardByTitle } from '~~/server/boards/board.service';

export default defineEventHandler(async (event) => {
    const { title } = event.context.params as { title: string };

    const titleDecoded = decodeURI(title);

    return await getBoardByTitle(titleDecoded);
});