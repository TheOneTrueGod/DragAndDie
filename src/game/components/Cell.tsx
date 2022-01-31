import React from 'react';
import { ConnectDropTarget, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { DraggableTypes } from '../constants';
import GamePiece from '../logic/GamePiece';
const StyledCell = styled.div<{ dark?: boolean }>`
    background-color: ${props => props.dark ? "rgb(240, 217, 181)" : "rgb(181, 136, 99)"};
    padding: 4px;
`;

type CellProps = { dark?: boolean, className: string, children?: React.ReactNode };
type BoardCellProps = CellProps & { onDrop: (pieceId: number) => void }

export function BoardCell({ dark, className, children, onDrop }: BoardCellProps) {
    const [{ hovered }, dropRef] = useDrop(
        () => ({
          accept: DraggableTypes.GAME_PIECE,
          drop: (item: { pieceId: number }) => { onDrop(item.pieceId); },
          collect: (monitor) => ({
            hovered: !!monitor.isOver()
          })
        })
      )

    return (
        <StyledCell ref={dropRef} dark={dark} className={className} >
            { children }
        </StyledCell>
    );
}

export function HandCell({ dark, className, children }: CellProps) {
    return (
        <StyledCell dark={dark} className={className} >
            { children }
        </StyledCell>
    );
}