import React, {Component} from 'react';
import Grid from './Grid.js';

class Game extends Component{
  constructor(props){
    super(props);
    this.state={next:""};
  }
  componentDidMount(){
    this.setState({next:(()=>Math.round(Math.random())?"X":"O")()})
  }
  render(){
    return(
      <div>
        <Grid nextMove={this.state.next}/>
        <p>Next move: {this.state.next}</p>
      </div>
    )
  }
}
export default Game;
