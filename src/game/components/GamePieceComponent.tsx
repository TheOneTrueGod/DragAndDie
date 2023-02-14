import styled from "styled-components";
import GamePiece from "../logic/GamePiece";
import { useDrag } from "react-dnd";
import { DraggableTypes } from "../constants";
import { BoardSize } from "../types";
import { useEffect } from "react";

const PieceWrapper = styled.div`
  position: absolute;
  padding: 4px;
  box-sizing: border-box;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const HealthText = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  color: red;
  background: white;
  border: 1px solid black;
  font-size: 12px;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-weight: bold;
`;

export default function GamePieceComponent({
  boardSize,
  squareSize,
  gamePiece,
}: {
  boardSize: BoardSize;
  squareSize: number;
  gamePiece: GamePiece;
}) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DraggableTypes.GAME_PIECE,
      item: { pieceId: gamePiece.getId() },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      canDrag: () => false,
    }),
    [gamePiece]
  );

  const position = gamePiece.getPosition();

  return (
    <PieceWrapper
      style={{
        top: squareSize * position.row + "px",
        left: squareSize * position.col + "px",
        width: squareSize + "px",
        height: squareSize + "px",
      }}
      key={gamePiece.getId()}
      ref={dragRef}
    >
      <Image src={`${gamePiece.getImageUrl()}`} />
      <HealthText>{gamePiece.getHealth()}</HealthText>
    </PieceWrapper>
  );
}
