import React from "react";
import BoardComponent from "./components/BoardComponent"
import { GameData } from "./logic/GameData";
import { BoardSize } from "./types";
import HandComponent from "./components/HandComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";

const boardSize: BoardSize = { x: 12, y: 5 };
const handSize: number = 3;
const SQUARE_SIZE: number = 60;

type Props = {};
type State = {};

const EndTurnButton = styled.button`
    margin-top: 8px;
    border: none;
    padding: 16px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    background: lightgreen;
    :active {
        background: green;
    }
`;

export default class GameContainer extends React.Component<Props, State> {
    gameData: GameData;
    constructor(props: Props, state: State) {
        super(props);
        this.gameData = new GameData(boardSize, handSize);
        this.state = {};
    }

    onDropPiece(pieceId: number, row: number, col: number) {
        let piece = this.gameData.getPiece(pieceId);
        this.gameData.setPieceLocation(row, col, piece);
        this.setState({});
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <BoardComponent boardSize={boardSize} squareSize={SQUARE_SIZE} pieces={this.gameData.boardPieces} onDropPiece={this.onDropPiece.bind(this)} />
                <HandComponent squareSize={SQUARE_SIZE} hand={this.gameData.playerHand} />
                <EndTurnButton onClick={() => alert("Hi")}>End Turn</EndTurnButton>
            </DndProvider>
        );
    }
}