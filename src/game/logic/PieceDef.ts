import elephant0 from "../../images/1511.jpg";
import elephant1 from "../../images/1250-1275c.jpg";
import elephant2 from "../../images/1255-1259.jpg";
import elephant3 from "../../images/1275-1300b.jpg";
import elephant4 from "../../images/1275-1300c.jpg";

import enemyImg from "../../images/generic_enemy.png";
import { BasicAttackAttachment } from "./unitAttachments/BasicAttackAttachment";
import { SummonEffectAttachment } from "./unitAttachments/SummonEffectAttachment";
import { UnitAttachment } from "./unitAttachments/UnitAttachment";
import { pieceDefDeclarations } from "./PieceDefDeclarations";

export default class PieceDef {
  constructor(
    private name: string,
    private health: number,
    private imageSrc: string,
    private attachments: Array<UnitAttachment>
  ) {}

  getAttachments() {
    return this.attachments;
  }

  getHealth(): number {
    return this.health;
  }

  getName(): string {
    return this.name;
  }
  getImageUrl(): string {
    return `${this.imageSrc}`;
  }
}

export function createEnemyPiece() {
  return new PieceDef("enemy", 5, enemyImg, [new BasicAttackAttachment()]);
}

export function createRandomPiece() {
  const namept1 = ["Ele", "Ali", "Honky"];
  const namept2 = ["t", "tium", "ter"];
  const imageSrcs = [elephant0, elephant1, elephant2, elephant3, elephant4];

  const pt1 = namept1[Math.floor(Math.random() * namept1.length)];
  const pt2 = namept2[Math.floor(Math.random() * namept2.length)];
  const img = imageSrcs[Math.floor(Math.random() * imageSrcs.length)];

  const health = Math.floor(Math.random() * 3 + 3);

  const pieceDef = new PieceDef(pt1 + "phan" + pt2, health, img, [
    new BasicAttackAttachment(),
    new SummonEffectAttachment(),
  ]);
  return pieceDef;
}

export function getPieceDef(id: number) {
  const def = pieceDefDeclarations[id];
  if (def === undefined) {
    throw new Error(`Can't find piece def id [${id}]`);
  }

  const pieceDef = new PieceDef(
    def.name,
    def.health,
    def.img,
    def.attachmentDefs
  );
  return pieceDef;
}
