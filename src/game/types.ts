export type BoardSize = { x: number; y: number };
export type PlayerName = "Player" | "Computer";
export type GamePhase =
  | "PlayerInput"
  | "PlayerMove"
  | "EnemyMove"
  | "PlayerAttack"
  | "EnemyAttack";
export type PieceLocation = "Hand" | "Board";
export type PiecePosition = { row: number; col: number };
