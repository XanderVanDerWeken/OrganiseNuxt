import type { Board } from '~~/shared/models';

export default defineEventHandler(async (event) => {
    const { title } = event.context.params as { title: string };

    const titleDecoded = decodeURI(title);

    return [
        {
            title: titleDecoded,
        }
    ] as Board[];
});