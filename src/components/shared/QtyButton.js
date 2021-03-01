import React from "react";
// import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class QtyButton extends React.Component {
    constructor(props) {
        super(props);
      }

  handleIncrement = () => {
      this.props.incQuantity(this.props.id);
    // this.setState(state => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
      this.props.decQuantity(this.props.id);
    // this.setState(state => ({ counter: state.counter - 1 }));
  };

  render() {   
    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button size="small" onClick={this.handleDecrement} disabled={this.props.counter < 2}>-</Button>
        <Button size="small" disabled>{this.props.counter}</Button>
        <Button size="small" onClick={this.handleIncrement}>+</Button>        
      </ButtonGroup>
    );
  }
}

export default QtyButton;