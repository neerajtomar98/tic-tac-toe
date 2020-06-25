import React, { PureComponent } from 'react';
import './grid.css';

class Grid extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }


    setValue = (event) => {
        console.log("clicked by payer:", this.props.turnOfPlayer);
        if (this.props.turnOfPlayer === 'A') {
            this.setState({ value: "O" }, () => {
                let data = {
                    'gridRow': this.props.gridRow,
                    'gridColumn': this.props.gridColumn,
                    'value': 'O'
                }
                this.props.handleSetValue(data);
            });
        }
        if (this.props.turnOfPlayer === 'B') {
            this.setState({ value: "X" },
                () => {
                    let data = {
                        'gridRow': this.props.gridRow,
                        'gridColumn': this.props.gridColumn,
                        'value': 'X'
                    }
                    this.props.handleSetValue(data);
                });
        }
    }

    render() {

        return (
            <div className="grid" onClick={this.setValue}>
                &nbsp;&nbsp;{this.state.value}
            </div>
        );
    }

}

export default Grid;