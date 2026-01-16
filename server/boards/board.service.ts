import type { BoardInput } from "~~/shared/models";
import type { Board } from "./board.models";
import { boardRepo } from "./board.repo";

export async function getAllBoards(): Promise<Board[]> {
    return boardRepo.findAllOverviews();
}

export async function getBoardByTitle(title: string): Promise<Board | null> {
    return await boardRepo.findByTitle(title);
}

export async function upsertBoard(newBoard: BoardInput): Promise<Board> {
    return await boardRepo.update(newBoard);
}
