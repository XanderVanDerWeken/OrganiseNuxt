import { toBoardOverviewDTO } from "../boards/board.mapper";
import { createBoard } from "../boards/board.service";

export default defineEventHandler(async (event) => {
    const { title } = await readBody(event);

    const newBoard = await createBoard(title);
    return toBoardOverviewDTO(newBoard);
});