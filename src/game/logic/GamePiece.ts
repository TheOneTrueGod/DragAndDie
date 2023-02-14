import { BoardSize, PieceLocation, PiecePosition, PlayerName } from "../types";
import { GameData } from "./GameData";
import PieceDef from "./PieceDef";

let ID = 1;

export default class GamePiece {
  private id: number;
  constructor(
    private owner: PlayerName,
    private location: PieceLocation,
    private position: PiecePosition,
    private pieceDef: PieceDef
  ) {
    this.id = ID++;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.pieceDef.getName();
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

  doEndTurn(gameData: GameData) {
    if (this.location === "Board") {
      if (this.owner === "Player") {
        const moveTo = { row: this.position.row, col: this.position.col + 1 };
        const pieceAtTarget = gameData.getPieceAtPosition(
          moveTo.row,
          moveTo.col
        );
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
  }
}
