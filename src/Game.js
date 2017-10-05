import React, {Component} from 'react';
import Grid from './Grid.js';

class Game extends Component{
  constructor(props){
    super(props);
    this.changePlayer = this.changePlayer.bind(this);
    this.state={next:"",winner:""};
  }
  componentDidMount(){
    this.setState({next:(()=>Math.round(Math.random())?"X":"O")()})
  }
  changePlayer(){
    this.setState(prevState=>({next:(()=>prevState.next==="X"?"O":"X")()}));
  }
  checkWinner(a,x,v){
  const mapper=indices=>indices.map(e=>a[e]?a[e][2]:"D");
  let one=a.slice(x-4,x).map(e=>e[2]).concat(v,a.slice(x+1,x+5).map(e=>e[2])).join("");
  var b2,e2,b3,e3;
  b2=[];e2=[];b3=[];e3=[];
  for(let i=1;i<5;i++)b2.unshift(x-i*9);
  for(let i=1;i<5;i++)e2.push(x+i*9);
  var two=mapper(b2).concat(v,mapper(e2)).join("");
  for(let i=1;i<5;i++)b3.unshift(x-i*11);
  for(let i=1;i<5;i++)e3.push(x+i*11);
  var three=mapper(e3).concat(v,b3).join("");
  var reg=RegExp(`${v}{5}`);
  console.log(x,`B2:${mapper(b2)} E2:${mapper(e2)} B3:${mapper(b3)} E3:${mapper(e3)}ONE:${one}`);

    }
  render(){
    return(
      <div>
        <Grid nextMove={this.state.next} onClick={this.changePlayer} check={this.checkWinner}/>
        <p>Next move: {this.state.next}</p>
        <p>Winner: {this.state.winner}</p>
      </div>
    )
  }
}
export default Game;
