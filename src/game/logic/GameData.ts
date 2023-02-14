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
  public boardPieces: { [key: number]: GamePiece };
  public gamePieces: Record<number, GamePiece> = {};

  constructor(private gameSize: BoardSize, handSize: number) {
    this.playerHand = new PlayerHand();
    Array(handSize)
      .fill(0)
      .forEach(() => {
        this.playerHand.addPiece(
          this.createRandomPiece("Player", "Hand", { row: 0, col: 0 })
        );
      });

    this.boardPieces = {};
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
      "Board",
      { row: row, col: col },
      createEnemyPiece()
    );

    this.gamePieces[enemyPiece.getId()] = enemyPiece;
    this.setPiecePosition(row, col, "Board", enemyPiece);
    return enemyPiece;
  }

  addEnemies() {
    this.addEnemy(9, 1);
    this.addEnemy(10, 2);
    this.addEnemy(9, 3);
  }

  createRandomPiece(
    owner: PlayerName,
    location: PieceLocation,
    position: PiecePosition
  ): GamePiece {
    let newPiece = new GamePiece(
      owner,
      location,
      position,
      createRandomPiece()
    );
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

  removePiece(gamePiece: GamePiece) {
    const currLocation = gamePiece.getLocation();
    const currPosition = gamePiece.getPosition();
    if (currLocation === "Board") {
      delete this.boardPieces[currPosition.row * 10000 + currPosition.col];
    } else if (currLocation === "Hand") {
      this.playerHand.removePiece(gamePiece);
    } else {
      throw new Error(
        "Not Implemented: Removal of units from a non-board location"
      );
    }
  }

  setPiecePosition(
    row: number,
    col: number,
    location: PieceLocation,
    gamePiece: GamePiece
  ) {
    const currLocation = gamePiece.getLocation();
    this.removePiece(gamePiece);
    switch (currLocation) {
      case "Hand":
        this.playerHand.addPiece(
          this.createRandomPiece("Player", "Hand", { row: 0, col: 0 })
        );
        break;
    }

    this.boardPieces[row * 10000 + col] = gamePiece;
    gamePiece.setPosition({ row: row, col: col }, location);
  }

  getPieceAtPosition(row: number, col: number): GamePiece | undefined {
    if (this.boardPieces[row * 10000 + col]) {
      return this.boardPieces[row * 10000 + col];
    }
    return undefined;
  }

  doEndTurn() {
    const gamePieceList = Object.values(this.gamePieces);
    gamePieceList.forEach((piece) => {
      piece.doMoveAction(this);
    });

    gamePieceList.forEach((piece) => {
      piece.doAttackAction(this);
    });

    gamePieceList.forEach((piece) => {
      if (piece.readyToDelete()) {
        delete this.gamePieces[piece.getId()];
        this.removePiece(piece);
      }
    });
  }
}
