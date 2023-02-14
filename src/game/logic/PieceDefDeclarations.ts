import elephant0 from "../../images/1511.jpg";
import elephant1 from "../../images/1250-1275c.jpg";
import elephant2 from "../../images/1255-1259.jpg";
import elephant3 from "../../images/1275-1300b.jpg";
import elephant4 from "../../images/1275-1300c.jpg";

import { BasicAttackAttachment } from "./unitAttachments/BasicAttackAttachment";
import { UnitAttachment } from "./unitAttachments/UnitAttachment";

type PieceDefDeclaration = {
  id: number;
  name: string;
  img: string;
  health: number;
  attachmentDefs: Array<UnitAttachment>;
};

export const pieceDefDeclarations: Array<PieceDefDeclaration> = [
  {
    id: 0,
    name: "Test0",
    img: elephant0,
    health: 3,
    attachmentDefs: [new BasicAttackAttachment()],
  },
  {
    id: 1,
    name: "Test1",
    img: elephant1,
    health: 3,
    attachmentDefs: [new BasicAttackAttachment()],
  },
  {
    id: 2,
    name: "Test2",
    img: elephant2,
    health: 3,
    attachmentDefs: [new BasicAttackAttachment()],
  },
  {
    id: 3,
    name: "Test3",
    img: elephant3,
    health: 3,
    attachmentDefs: [new BasicAttackAttachment()],
  },
  {
    id: 4,
    name: "Test4",
    img: elephant4,
    health: 3,
    attachmentDefs: [new BasicAttackAttachment()],
  },
];
