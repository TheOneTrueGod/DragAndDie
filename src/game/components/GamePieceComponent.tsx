import styled from "styled-components";
import GamePiece from "../logic/GamePiece";
import { useDrag } from 'react-dnd'
import { DraggableTypes } from "../constants";

const Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

export default function GamePieceComponent({ gamePiece }: { gamePiece: GamePiece}) {
    const [{ isDragging }, dragRef] = useDrag(
        () => ({
          type: DraggableTypes.GAME_PIECE,
          item: { pieceId: gamePiece.getId() },
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
          })
        }),
        [gamePiece]
      );
    
    return <div key={gamePiece.getId()} ref={dragRef}><Image src={`${gamePiece.getImageUrl()}`} /></div>;
}