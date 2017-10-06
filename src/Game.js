import React, {Component} from 'react';
import Grid from './Grid.js';
import InputSize from './InputSize.js';

class Game extends Component{
  constructor(props){
    super(props);
    this.changePlayer = this.changePlayer.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.state={next:"",
      winner:"",
      width:15,
      height:15};
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
  if(winner) {this.setState({winner:v})}
  console.log(x,`uB2:${b2} B2:${mapper(b2)} uE2:${e2} E2:${mapper(e2)} uB3: ${b3} B3:${mapper(b3)} uE3:${e3} E3:${mapper(e3)}ONE:${one}`);

  console.log(`WINNER: ${winner} FOUR: ${four} THREE: ${three} TWO: ${two} ONE: ${one}`);

    }
  render(){
    return(
      <div>
        <Grid nextMove={this.state.next} onClick={this.changePlayer} check={this.checkWinner}winner={this.state.winner}
          width={this.state.width} height={this.state.height}/>
        <p>Next move: {this.state.next}</p>
        <p>Winner: {this.state.winner}</p>
        <InputSize height = {this.state.height} width = {this.state.width}/>
      </div>
    )
  }
}
export default Game;
