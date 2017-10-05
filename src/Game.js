import React, {Component} from 'react';
import Grid from './Grid.js';

class Game extends Component{
  constructor(props){
    super(props);
    this.changePlayer = this.changePlayer.bind(this);
    this.state={next:""};
  }
  componentDidMount(){
    this.setState({next:(()=>Math.round(Math.random())?"X":"O")()})
  }
  changePlayer(){
    this.setState(prevState=>({next:(()=>prevState.next==="X"?"O":"X")()}));
    console.log("Hello",this.state.next);
  }
  render(){
    return(
      <div>
        <Grid nextMove={this.state.next} onClick={this.changePlayer}/>
        <p>Next move: {this.state.next}</p>
      </div>
    )
  }
}
export default Game;
