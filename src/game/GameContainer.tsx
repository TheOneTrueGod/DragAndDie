import React from "react";
import BoardComponent from "./components/BoardComponent"
import { GameData } from "./logic/GameData";
import { BoardSize } from "./types";
import HandComponent from "./components/HandComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GamePiece from "./logic/GamePiece";

const boardSize: BoardSize = { x: 8, y: 8 };
const handSize: number = 3;
const SQUARE_SIZE: number = 60;

type Props = {};
type State = {};

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
            </DndProvider>
        );
    }
}