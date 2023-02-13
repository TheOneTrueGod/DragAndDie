import styled from "styled-components";
import { PlayerHand } from "../logic/PlayerHand";
import { HandCell } from "./Cell";
import GamePieceComponent from "./GamePieceComponent";
import HandPieceComponent from "./HandPieceComponent";

const HandWrapper = styled.div`
  display: float;
  justify-content: center;
  margin-top: 8px;
`;

const Hand = styled.div<{ handSize: number; squareSize: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.handSize},
    ${(props) => props.squareSize}px
  );
  grid-template-rows: ${(props) => props.squareSize}px;
`;

export default function HandComponent({
  hand,
  squareSize,
}: {
  hand: PlayerHand;
  squareSize: number;
}) {
  let handSize = hand.getPieces().length;
  return (
    <HandWrapper>
      <Hand handSize={handSize} squareSize={squareSize}>
        {Array(handSize)
          .fill(0)
          .map((_, i) => {
            const piece = hand.getPiece(i);
            return (
              <HandCell
                key={`handCell${i}`}
                dark={i % 2 === 0}
                className={`handCell${i}`}
              >
                {piece && <HandPieceComponent gamePiece={piece} />}
              </HandCell>
            );
          })}
      </Hand>
    </HandWrapper>
  );
}
