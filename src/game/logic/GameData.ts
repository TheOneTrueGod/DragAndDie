import { BoardSize, PieceLocation, PlayerName } from "../types";
import GamePiece from "./GamePiece";
import { createRandomPiece } from "./PieceDef";
import { PlayerHand } from "./PlayerHand";

export class GameData {
    public playerHand: PlayerHand;
    public boardPieces: Array<GamePiece | null>;
    public gamePieces: Record<number, GamePiece> = {};

    constructor(private gameSize: BoardSize, handSize: number) {
        this.playerHand = new PlayerHand();
        Array(handSize).fill(0).forEach(() => {
            this.playerHand.addPiece(this.createRandomPiece("Player", "Hand"));
        })

        this.boardPieces = Array(this.gameSize.x * this.gameSize.y).fill(null);
    }

    createRandomPiece(owner: PlayerName, location: PieceLocation): GamePiece {
        let newPiece = new GamePiece(owner, location, createRandomPiece());
        this.gamePieces[newPiece.getId()] = newPiece;
        return newPiece;
    }

    getPiece(id: number): GamePiece {
        if (!this.gamePieces[id]) {
            throw new Error(`Couldn't find piece id ${id} in game pieces ${this.gamePieces}`);
        }
        return this.gamePieces[id];
    }

    setPieceLocation(row: number, col: number, gamePiece: GamePiece) {
        const currLocation = gamePiece.getLocation();
        if (currLocation === "Hand") {
            this.playerHand.removePiece(gamePiece);
            this.playerHand.addPiece(this.createRandomPiece("Player", "Hand"));
        } else {
            this.boardPieces[currLocation] = null;
        }
        this.boardPieces[this.gameSize.x * row + col] = gamePiece;
    }
}