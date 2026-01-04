import { toBoardOverviewDTO } from "../boards/board.mapper";
import { getAllBoards } from "../boards/board.service";

export default defineEventHandler(async () => {
    const boards = await getAllBoards();

    return boards.map(toBoardOverviewDTO);
});