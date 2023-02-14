import { GameData } from "../GameData";
import GamePiece from "../GamePiece";
import { UnitAttachment } from "./UnitAttachment";

export class BasicAttackAttachment extends UnitAttachment {
  doAttackAction(unit: GamePiece, gameData: GameData) {
    let attackDirection = unit.getOwner() === "Player" ? 1 : -1;

    const unitPosition = unit.getPosition();
    const targetPos = {
      row: unitPosition.row,
      col: unitPosition.col + 1 * attackDirection,
    };

    const pieceAtTarget = gameData.getPieceAtPosition(
      targetPos.row,
      targetPos.col
    );
    if (pieceAtTarget) {
      pieceAtTarget.dealDamage(1);
    }
  }
}
