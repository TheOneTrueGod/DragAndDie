import { PieceLocation, PiecePosition, PlayerName } from "../types";
import { GameData } from "./GameData";
import PieceDef from "./PieceDef";
import { UnitAttachment } from "./unitAttachments/UnitAttachment";

let ID = 1;

export default class GamePiece {
  private id: number;
  private attachments: Array<UnitAttachment> = [];
  private damageTaken: number = 0;
  constructor(
    private owner: PlayerName,
    private location: PieceLocation,
    private position: PiecePosition,
    private pieceDef: PieceDef
  ) {
    this.id = ID++;
    this.attachments = pieceDef.getAttachments();
  }

  getId() {
    return this.id;
  }
  getPieceDef() {
    return this.pieceDef;
  }
  getName() {
    return this.pieceDef.getName();
  }
  getOwner() {
    return this.owner;
  }
  getImageUrl() {
    return this.pieceDef.getImageUrl();
  }
  getLocation() {
    return this.location;
  }
  getPosition() {
    return { row: this.position.row, col: this.position.col };
  }
  setPosition(position: PiecePosition, location?: PieceLocation) {
    this.position = { row: position.row, col: position.col };
    location && (this.location = location);
  }

  doMoveAction(gameData: GameData) {
    if (this.location !== "Board") {
      return;
    }
    if (this.owner === "Player") {
      const moveTo = { row: this.position.row, col: this.position.col + 1 };
      const pieceAtTarget = gameData.getPieceAtPosition(moveTo.row, moveTo.col);
      if (!pieceAtTarget) {
        gameData.setPiecePosition(
          this.position.row,
          this.position.col + 1,
          "Board",
          this
        );
      }
    }
  }

  doSummonAction(gameData: GameData) {
    if (this.location !== "Board") {
      return;
    }
    this.attachments.forEach((attachment) => {
      attachment.doSummonAction(this, gameData);
    });
  }

  doAttackAction(gameData: GameData) {
    if (this.location !== "Board") {
      return;
    }
    this.attachments.forEach((attachment) => {
      attachment.doAttackAction(this, gameData);
    });
  }

  dealDamage(amount: number) {
    if (amount < 0) {
      console.warn(
        "Trying to deal a negative amount of damage...",
        amount,
        this
      );
    }
    this.damageTaken += amount;
  }

  getHealth() {
    return Math.ceil(this.pieceDef.getHealth() - this.damageTaken);
  }

  readyToDelete() {
    return this.getHealth() <= 0;
  }
}
