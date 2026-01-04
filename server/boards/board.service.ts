import type { Board } from "./board.models";
import { boardRepo } from "./board.repo";

export async function getAllBoards(): Promise<Board[]> {
    return boardRepo.findAllOverviews();
}

export async function getBoardByTitle(title: string): Promise<Board | null> {
    return await boardRepo.findByTitle(title);
}

export async function createBoard(title: string): Promise<Board> {
    return await boardRepo.create(title);
}