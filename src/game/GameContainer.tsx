import React from "react";
import BoardComponent from "./components/BoardComponent";
import { GameData } from "./logic/GameData";
import { BoardSize, GamePhase } from "./types";
import HandComponent from "./components/HandComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "./components/common/Button";

const boardSize: BoardSize = { x: 12, y: 5 };
const handSize: number = 5;
const SQUARE_SIZE: number = 60;

type Props = {};
type State = { turnNumber: number; gamePhase: GamePhase };

export default class GameContainer extends React.Component<Props, State> {
  gameData: GameData;
  constructor(props: Props, state: State) {
    super(props);
    this.gameData = new GameData(boardSize, handSize);
    this.state = {
      turnNumber: 0,
      gamePhase: "PlayerInput",
    };
  }

  onDropPiece(pieceId: number, row: number, col: number) {
    let piece = this.gameData.getPiece(pieceId);
    this.gameData.setPiecePosition(row, col, "Board", piece);
    this.setState({});
  }

  onEndTurnClick() {
    this.gameData.doEndTurn();
    this.setState({});
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <BoardComponent
          turnNumber={this.gameData.getTurnNumber()}
          gamePhase={this.gameData.getGamePhase()}
          boardSize={boardSize}
          squareSize={SQUARE_SIZE}
          pieces={this.gameData.boardPieces}
          onDropPiece={this.onDropPiece.bind(this)}
        />
        <HandComponent
          squareSize={SQUARE_SIZE}
          hand={this.gameData.playerHand}
        />
        <Button onClick={() => this.onEndTurnClick()}>End Turn</Button>
      </DndProvider>
    );
  }
}
