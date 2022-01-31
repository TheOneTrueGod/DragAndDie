import { PieceLocation, PlayerName } from "../types";
import PieceDef from "./PieceDef";

let ID = 1;

export default class GamePiece {
    private id: number;
    constructor(
        private owner: PlayerName,
        private location: PieceLocation,
        private pieceDef: PieceDef,
    ) {
        this.id = ID ++;
    }

    getId() { return this.id; }
    getName() { return this.pieceDef.getName(); }
    getImageUrl() { return this.pieceDef.getImageUrl(); }
    getLocation() { return this.location; }
    setLocation(location: PieceLocation) {
        this.location = location;
    }
}