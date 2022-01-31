import React from "react";
import BoardComponent from "./components/BoardComponent"
import { GameData } from "./logic/GameData";
import { BoardSize } from "./types";
import HandComponent from "./components/HandComponent";

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

    render() {
        return (
            <div>
                <BoardComponent boardSize={boardSize} squareSize={SQUARE_SIZE} />
                <HandComponent handSize={handSize} squareSize={SQUARE_SIZE} hand={this.gameData.playerHand} />
            </div>
        );
    }
}