import styled from "styled-components";
import GamePiece from "../logic/GamePiece";

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

export default function GamePieceComponent({ gamePiece }: { gamePiece: GamePiece}) {
    return <Image src={`${gamePiece.getImageUrl()}`} />;
}