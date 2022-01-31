import { PlayerName } from "../types";
import PieceDef from "./PieceDef";

export default class GamePiece {
    constructor(
        private owner: PlayerName,
        private pieceDef: PieceDef,
    ) {

    }

    getImageUrl() { return this.pieceDef.getImageUrl(); }
}