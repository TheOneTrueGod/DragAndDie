import { BoardSize } from "../types";
import { PlayerHand } from "./PlayerHand";

export class GameData {
    public playerHand: PlayerHand;

    constructor(gameSize: BoardSize, handSize: number) {
        this.playerHand = new PlayerHand(handSize);
    }
}