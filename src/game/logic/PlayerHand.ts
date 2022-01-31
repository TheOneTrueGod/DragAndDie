import GamePiece from "./GamePiece";
import { createRandomPiece } from "./PieceDef";

export class PlayerHand {
    private pieces: Array<GamePiece>;
    constructor(
        private handSize: number,
    ) {
        this.pieces = Array(handSize).fill(0).map(() => new GamePiece('Player', createRandomPiece()));
    }

    getPieces() { return this.pieces; }
    getPiece(i: number): GamePiece | null { 
        if (i < 0 || i > this.handSize) { return null; }
        return this.pieces[i];
    }
}