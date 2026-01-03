import type { Board } from '~~/shared/models';

export default defineEventHandler(async (event) => {
    const { title } = event.context.params as { title: string };

    const titleDecoded = decodeURI(title);

    // TODO: Fetch board from database
    return {
        title: titleDecoded,
    } as Board;
});