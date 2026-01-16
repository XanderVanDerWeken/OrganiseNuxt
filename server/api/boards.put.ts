import type { PutBoardDTO } from "~~/shared/models";
import { upsertBoard } from "../boards/board.service";
import { toBoardDTO } from "../boards/board.mapper";

export default defineEventHandler(async (event) => {
    const body = await readBody<PutBoardDTO>(event);

    const updatedBoard = await upsertBoard(body);
    return toBoardDTO(updatedBoard);
})