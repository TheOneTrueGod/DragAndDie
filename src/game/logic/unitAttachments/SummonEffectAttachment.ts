import { GameData } from "../GameData";
import GamePiece from "../GamePiece";
import { UnitAttachment } from "./UnitAttachment";

export class SummonEffectAttachment extends UnitAttachment {
  doSummonAction(unit: GamePiece, gameData: GameData) {
    this.components.forEach((component) => component.doEffect(unit, gameData));
  }
}
