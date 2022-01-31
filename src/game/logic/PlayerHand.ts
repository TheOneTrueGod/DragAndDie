import GamePiece from "./GamePiece";
import { createRandomPiece } from "./PieceDef";

export class PlayerHand {
    private pieces: Array<GamePiece> = [];

    addPiece(piece: GamePiece) {
        this.pieces.push(piece);
    }

    getPieces() { return this.pieces; }
    getPiece(i: number): GamePiece | null { 
        if (i < 0 || i > this.pieces.length) { return null; }
        return this.pieces[i];
    }

    removePiece(gamePiece: GamePiece) {
        this.pieces.splice(this.pieces.indexOf(gamePiece), 1);
    }
}