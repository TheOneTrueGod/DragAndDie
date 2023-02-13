import styled from "styled-components";
import GamePiece from "../logic/GamePiece";
import { BoardSize } from "../types";
import GamePieceComponent from "./GamePieceComponent";

const ContainerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

type Props = {
  boardSize: BoardSize;
  squareSize: number;
  pieces: Array<GamePiece | null>;
};

export default function GamePieceContainer({
  boardSize,
  squareSize,
  pieces,
}: Props) {
  return (
    <ContainerWrapper>
      {pieces.map(
        (piece) =>
          piece && (
            <GamePieceComponent
              key={piece.getId()}
              boardSize={boardSize}
              squareSize={squareSize}
              gamePiece={piece}
            />
          )
      )}
    </ContainerWrapper>
  );
}
