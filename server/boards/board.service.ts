import type { BoardDTO, BoardOverviewDTO } from "~~/shared/models";
import { boardRepo } from "./board.repo";
import { toBoardDTO } from "./board.mapper";

export async function getAllBoards(): Promise<BoardOverviewDTO[]> {
    return boardRepo.findAll();
}

export async function getBoardByTitle(title: string): Promise<BoardDTO> {
    const board = await boardRepo.findByTitle(title);
    return toBoardDTO(board);
}

export async function createBoard(title: string): Promise<BoardDTO> {
    const newBoard = await boardRepo.create(title);
    return toBoardDTO(newBoard);
}