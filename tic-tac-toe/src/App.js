import React, { PureComponent } from 'react';
import './App.css';
import Game from './components/Game';

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            N: 3,
            gridValues: this.initializeGridValues(3),
            winner: "",
            errorMessage: null
        }
    }

    initializeGridValues = (N) => {
        let rows = {};
        for (let i = 0; i < N; i++) {
            rows[i] = {};
            for (let j = 0; j < N; j++) {
                rows[i][j] = null;
            }
        }
        return rows;
    }

    handleN = (event) => {
        let N = event.target.value;
        if (!N || N < 3) {
            this.setState({ N: N, errorMessage: "Please enter a valid value" });
            return;
        }
        let rows = this.initializeGridValues(N);
        this.setState({ N: N, gridValues: rows, errorMessage: null });
    }

    checkIfWinner = () => {
        for (let k = 0; k < this.state.N; k++) {

            let rowValues = Object.values(this.state.gridValues[k]).filter(element => {
                return element !== null
            });
            if (rowValues.length < this.state.N) {
                return false;
            }

        }

        //win logic
        let rowMatch = false;
        let columnMatch = false;
        let diagonalMatch = true;

        for (var i = 0; i < this.state.N; i++) {
            let rowStartValue = this.state.gridValues[i][0];

            for (var j = 0; j < this.state.N; j++) {
                let colStartValue = this.state.gridValues[0][j];

                this.state.gridValues[i][j] === rowStartValue ? rowMatch = true : rowMatch = false;
                this.state.gridValues[j][i] === colStartValue ? columnMatch = true : columnMatch = false;

                if (i === j && this.state.gridValues[i][j] !== this.state.gridValues[0][0]) {
                    diagonalMatch = false;
                }

                if (j === i + this.state.N - 1
                    && this.state.gridValues[i][j] !== this.state.gridValues[i][i + this.state.N - 1]) {
                    diagonalMatch = false;
                }

            }
        }

        return rowMatch || columnMatch || diagonalMatch;
    }


    updateGridValues = (row, column, value) => {
        // console.log(row, column, value);
        this.setState((prevState) => {
            let updatedState = Object.assign({}, prevState);
            // console.log(updatedState.gridValues);
            updatedState.gridValues[row][column] = value;
            return updatedState
        }
            , () => {

                let win = this.checkIfWinner();
                if (win) {
                    console.log("winner:", value);
                }
            });
    }

    onResetGame = () => {
        let gridValues = this.initializeGridValues(3);
        this.setState({ N: 3, gridValues: gridValues, errorMessage: null });
    }
    onStartGame = () => {
        let gridValues = this.initializeGridValues(this.state.N);
        this.setState({ gridValues: gridValues, errorMessage: null });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h2> Tic Tac Toe</h2>
                </header>
                <div className="game">
                    <div className="N-input-section">
                        <label className="N-input-label">
                            <h3> Please enter value for N for NXN game:</h3>
                        </label>
                        <input
                            className="N-input"
                            onChange={this.handleN}
                            value={this.state.N || ""}
                        />
                    </div>

                    {this.state.errorMessage ? (<div className="error"> {this.state.errorMessage}</div>) : ""}
                    <Game
                        N={this.state.N}
                        gridValues={this.state.gridValues}
                        onStartGame={this.onStartGame}
                        onResetGame={this.onResetGame}
                        updateGridValues={this.updateGridValues}
                        errorMessage={this.state.errorMessage} />



                </div>
            </div>
        )
    }
}

export default App;
