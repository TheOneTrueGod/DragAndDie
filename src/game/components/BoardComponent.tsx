import styled from "styled-components";
import GamePiece from "../logic/GamePiece";
import { BoardSize, GamePhase } from "../types";
import { BoardCell } from "./Cell";
import GamePieceComponent from "./GamePieceComponent";
import GamePieceContainer from "./GamePieceContainer";

const StyledBoard = styled.div<{ boardSize: BoardSize; squareSize: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.boardSize.x},
    ${(props) => props.squareSize}px
  );
  grid-template-rows: repeat(
    ${(props) => props.boardSize.y},
    ${(props) => props.squareSize}px
  );
`;

type Props = {
  boardSize: BoardSize;
  squareSize: number;
  pieces: Array<GamePiece | null>;
  onDropPiece: (pieceId: number, row: number, col: number) => void;
  turnNumber: number;
  gamePhase: GamePhase;
};

export default function BoardComponent({
  boardSize,
  squareSize,
  pieces,
  onDropPiece,
}: Props) {
  return (
    <StyledBoard
      className="board"
      boardSize={boardSize}
      squareSize={squareSize}
    >
      {Array(boardSize.y)
        .fill(0)
        .map((_, row) => {
          return Array(boardSize.x)
            .fill(0)
            .map((_, col) => {
              const piece = pieces[row * boardSize.x + col];
              return (
                <BoardCell
                  key={`cell-${col}=${row}`}
                  onDrop={(pieceId: number) => {
                    onDropPiece(pieceId, row, col);
                  }}
                  className="boardCell"
                  dark={(col + (row % 2)) % 2 === 0}
                >
                  <div
                    style={{
                      width: squareSize + "px",
                      height: squareSize + "px",
                    }}
                  ></div>
                </BoardCell>
              );
            });
        })}
      <GamePieceContainer
        boardSize={boardSize}
        squareSize={squareSize}
        pieces={pieces}
      />
    </StyledBoard>
  );
}
