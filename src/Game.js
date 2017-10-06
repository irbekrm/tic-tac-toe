import React, {Component} from 'react';
import Grid from './Grid.js';
import Score from './Score.js';

class Game extends Component{
  constructor(props){
    super(props);
    this.changePlayer = this.changePlayer.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.state={next:"",
      winner:"",
      width:13,
      height:13,
      score:{"X":0,"O":0}};
  }
  componentDidMount(){
    this.setState({next:(()=>Math.round(Math.random())?"X":"O")()})
  }
  changePlayer(){
    this.setState(prevState=>({next:(()=>prevState.next==="X"?"O":"X")()}));
  }
  checkWinner(a,x,v){
  const mapper=indices=>indices.map(e=>a[e]?a[e][2]?a[e][2]:"D":"");
  let one=a.slice(x-4,x).map(e=>e[2]?e[2]:"D").concat(v,a.slice(x+1,x+5).map(e=>e[2]?e[2]:"D")).join("");
  var b2,e2,b3,e3,b4,e4;
  b2=[];e2=[];b3=[];e3=[];b4=[];e4=[];
  for(let i=1;i<5;i++)b2.unshift(x-i*9);
  for(let i=1;i<5;i++)e2.push(x+i*9);
  var two=mapper(b2).concat(v,mapper(e2)).join("");
  for(let i=1;i<5;i++)b3.unshift(x-i*11);
  for(let i=1;i<5;i++)e3.push(x+i*11);
  var three=mapper(e3).concat(v,mapper(b3)).join("");
  for(let i=1;i<5;i++)b4.unshift(x-10*i);
  for(let i=1;i<5;i++)e4.push(x+10*i);
  var four=mapper(b4).concat(v,mapper(e4)).join("");
  var reg=RegExp(`${v}{5}`);
  var winner=reg.test(one)||reg.test(two)||reg.test(three)||reg.test(four);
  if(winner) {this.setState(prevState=>{let x=prevState.score; x[v]+=1;return {
    next:"",winner:v,score: x}})};
  console.log(`v: ${v}, this.state.score: ${this.state.score}, this.state.score[v]: ${this.state.score[v]}`)
};
  render(){
    return(
      <div>
        <p>Next move: {this.state.next}</p>
        <p>Winner: {this.state.winner}</p>
        <Score x={this.state.score.X} o={this.state.score.O}/>
        <Grid nextMove={this.state.next} onClick={this.changePlayer} check={this.checkWinner}winner={this.state.winner}
          width={this.state.width} height={this.state.height}/>
      </div>
    )
  }
}
export default Game;
