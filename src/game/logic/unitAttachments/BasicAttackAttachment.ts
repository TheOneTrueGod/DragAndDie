import { GameData } from "../GameData";
import GamePiece from "../GamePiece";
import AttachmentComponent from "./attachmentComponents/AttachmentComponent";
import DamageComponent from "./attachmentComponents/DamageComponent";
import { UnitAttachment } from "./UnitAttachment";

export class BasicAttackAttachment extends UnitAttachment {
  constructor(components?: Array<AttachmentComponent> | AttachmentComponent) {
    super(components || new DamageComponent());
  }

  doAttackAction(unit: GamePiece, gameData: GameData) {
    this.components.forEach((component) => component.doEffect(unit, gameData));
  }
}
