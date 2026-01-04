import { getAllBoards } from "../boards/board.service";

export default defineEventHandler(async () => {
    return await getAllBoards();
});