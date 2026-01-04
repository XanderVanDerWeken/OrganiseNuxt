import { toBoardDTO } from '~~/server/boards/board.mapper';
import { getBoardByTitle } from '~~/server/boards/board.service';

export default defineEventHandler(async (event) => {
    const { title } = event.context.params as { title: string };

    const titleDecoded = decodeURI(title);

    const board = await getBoardByTitle(titleDecoded);

    if (!board) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Board not found',
        })
    }

    return toBoardDTO(board);
});