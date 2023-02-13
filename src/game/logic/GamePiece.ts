import { BoardSize, PieceLocation, PiecePosition, PlayerName } from "../types";
import { GameData } from "./GameData";
import PieceDef from "./PieceDef";

let ID = 1;

export default class GamePiece {
  private id: number;
  constructor(
    private owner: PlayerName,
    private location: PieceLocation,
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
  setLocation(location: PieceLocation) {
    this.location = location;
  }
  getPosition(boardSize: BoardSize): PiecePosition {
    if (this.location === "Hand") {
      return { row: 0, col: 0 };
    }
    return {
      row: Math.floor(this.location / boardSize.x),
      col: this.location % boardSize.x,
    };
  }

  doEndTurn(gameData: GameData) {
    if (this.location === "Hand") {
      return;
    }
    if (this.owner === "Player") {
      const position = gameData.locationToPosition(this.location);
      gameData.setPieceLocation(position.row, position.col + 1, this);
    }
  }
}
