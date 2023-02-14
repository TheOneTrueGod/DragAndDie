import { GameData } from "../../GameData";
import GamePiece from "../../GamePiece";
import AttachmentComponent from "./AttachmentComponent";

type DamageComponentArgs = {
  damage: number;
  spotsToHit?: Array<[number, number]>;
};

export default class DamageComponent extends AttachmentComponent {
  damage: number;
  spotsToHit: Array<[number, number]>;
  constructor(args?: DamageComponentArgs) {
    super();
    this.damage = args?.damage || 1;
    this.spotsToHit = args?.spotsToHit || [[1, 0]];
  }

  doEffect(unit: GamePiece, gameData: GameData) {
    let attackDirection = unit.getOwner() === "Player" ? 1 : -1;

    this.spotsToHit.forEach((spot) => {
      const unitPosition = unit.getPosition();
      const targetPos = {
        row: unitPosition.row + spot[1],
        col: unitPosition.col + spot[0] * attackDirection,
      };

      const pieceAtTarget = gameData.getPieceAtPosition(
        targetPos.row,
        targetPos.col
      );
      if (pieceAtTarget) {
        pieceAtTarget.dealDamage(this.damage);
      }
    });
  }
}
