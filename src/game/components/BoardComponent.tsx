import styled from 'styled-components';
import { BoardSize } from '../types';
import Cell from './Cell';

const StyledBoard = styled.div<{ boardSize: BoardSize, squareSize: number }>`
    display: grid;
    grid-template-columns: repeat(${props => props.boardSize.x}, ${props => props.squareSize}px);
    grid-template-rows: repeat(${props => props.boardSize.y}, ${props => props.squareSize}px);
`;

export default function BoardComponent({ boardSize, squareSize } : { boardSize: BoardSize, squareSize: number }) {
    return (
        <StyledBoard className="board" boardSize={boardSize} squareSize={squareSize}>
            {Array(boardSize.x).fill(0).map((_, col) => {
                return Array(boardSize.y).fill(0).map((_, row) => {
                    return (
                        <Cell
                            key={`cell-${col}=${row}`}
                            className="boardCell"
                            dark={(col % boardSize.x + row % 2) % 2 === 0}
                        />
                    );
                })
            })}
        </StyledBoard>
    );
}