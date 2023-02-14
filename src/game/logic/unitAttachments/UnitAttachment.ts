import { GameData } from "../GameData";
import GamePiece from "../GamePiece";
import AttachmentComponent from "./attachmentComponents/AttachmentComponent";

export class UnitAttachment {
  components: Array<AttachmentComponent>;
  constructor(components?: Array<AttachmentComponent> | AttachmentComponent) {
    if (Array.isArray(components)) {
      this.components = components;
    } else if (components === undefined) {
      this.components = [];
    } else {
      this.components = [components];
    }
  }

  doAttackAction(unit: GamePiece, gameData: GameData) {}
  doSummonAction(unit: GamePiece, gameData: GameData) {}
}
