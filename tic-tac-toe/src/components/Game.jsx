import React, { PureComponent } from 'react';
import './game.css';
import Grid from './Grid';

class Game extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            turnOfPlayer: 'A',
            gameStarted: false
        }
    }

    handleSetValue = (data) => {
        // console.log("data:", data);
        this.setState((prevState) => {
            if (prevState.turnOfPlayer === 'A') {
                return { turnOfPlayer: 'B' }
            }
            else {
                return { turnOfPlayer: 'A' }
            }
        }, () => {
            this.props.updateGridValues(data.gridRow, data.gridColumn, data.value)
        });
    }

    renderGameGrid = () => {

        let gameGrid = [];
        for (let i = 0; i < this.props.N; i++) {
            let row = [];
            for (let j = 0; j < this.props.N; j++) {
                row.push(
                    <Grid
                        key={i + "_" + j}
                        gridRow={i}
                        gridColumn={j}
                        {...this.props}
                        turnOfPlayer={this.state.turnOfPlayer}
                        handleSetValue={this.handleSetValue}
                    />
                )
            }
            gameGrid.push(
                <div key={"row+_" + i}>
                    {row}
                </div>
            );
        }

        return gameGrid;
    }

    startGame = (event) => {
        this.setState({ gameStarted: true },
            () => {
                this.props.onStartGame();
            })
    }
    resetGame = (event) => {
        this.setState({ gameStarted: false }, () => {
            this.props.onResetGame();
        })
    }

    render() {
        return (
            <div className="game-container">
                <div className="game-details">
                    <div className="game-actions">
                        <button className="start-game" onClick={this.startGame}>
                            Start Game
                         </button>
                        <button className="reset-game" onClick={this.resetGame}>
                            Stop
                      </button>
                    </div>

                    <div className="player-info">
                        <label>
                            <h3>  {this.state.gameStarted ? "Turn of Player: " + this.state.turnOfPlayer : ""}
                            </h3>
                        </label>
                    </div>
                </div>
                {this.state.gameStarted ?
                    <div className={"grid-container"}>
                        {this.renderGameGrid()}

                    </div>
                    : null}
            </div >
        );
    }
}

export default Game;