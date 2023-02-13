import {
  BoardSize,
  GamePhase,
  PieceLocation,
  PiecePosition,
  PlayerName,
} from "../types";
import GamePiece from "./GamePiece";
import { createEnemyPiece, createRandomPiece } from "./PieceDef";
import { PlayerHand } from "./PlayerHand";

export class GameData {
  public playerHand: PlayerHand;
  public boardPieces: Array<GamePiece | null>;
  public gamePieces: Record<number, GamePiece> = {};

  constructor(private gameSize: BoardSize, handSize: number) {
    this.playerHand = new PlayerHand();
    Array(handSize)
      .fill(0)
      .forEach(() => {
        this.playerHand.addPiece(this.createRandomPiece("Player", "Hand"));
      });

    this.boardPieces = Array(this.gameSize.x * this.gameSize.y).fill(null);
    this.addEnemies();
  }

  getTurnNumber(): number {
    return 0;
  }

  getGamePhase(): GamePhase {
    return "PlayerInput";
  }

  addEnemy(col: number, row: number) {
    let enemyPiece = new GamePiece(
      "Computer",
      this.gameSize.x * row + col,
      createEnemyPiece()
    );

    this.gamePieces[enemyPiece.getId()] = enemyPiece;
    this.setPieceLocation(row, col, enemyPiece);
    return enemyPiece;
  }

  addEnemies() {
    this.addEnemy(9, 1);
    this.addEnemy(10, 2);
    this.addEnemy(9, 3);
  }

  createRandomPiece(owner: PlayerName, location: PieceLocation): GamePiece {
    let newPiece = new GamePiece(owner, location, createRandomPiece());
    this.gamePieces[newPiece.getId()] = newPiece;
    return newPiece;
  }

  getPiece(id: number): GamePiece {
    if (!this.gamePieces[id]) {
      throw new Error(
        `Couldn't find piece id ${id} in game pieces ${this.gamePieces}`
      );
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
    const newLocation = this.gameSize.x * row + col;
    this.boardPieces[newLocation] = gamePiece;
    gamePiece.setLocation(newLocation);
  }

  locationToPosition(location: PieceLocation): PiecePosition {
    if (location === "Hand") {
      console.warn(
        "Trying to get the position of a game piece in your hand..."
      );
      return { row: 0, col: 0 };
    }
    return {
      row: Math.floor(location / this.gameSize.x),
      col: location % this.gameSize.x,
    };
  }

  doEndTurn() {
    Object.values(this.gamePieces).forEach((piece) => {
      piece.doEndTurn(this);
    });
  }
}
