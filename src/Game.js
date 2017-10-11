import React, {Component} from 'react';
import Grid from './Grid.js';
import Score from './Score.js';
import randGen from './RandGen.js';
import playersNames from './RandGen.js';
import {findDOMNode} from 'react-dom';
import './index.css';

class Game extends Component{
  constructor(props){
    super(props);
    this.changePlayer = this.changePlayer.bind(this); //::this.changePlayer;
    this.checkWinner = this.checkWinner.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      next:0,
      order: [],
      score:{},
      winner:"",
      size: 12,
      numOfPlayers:2,
      update: false,
    };
  }
  componentDidMount(){
    const players = randGen(this.state.numOfPlayers);
    this.setState({order: players,
      score: (obj => {players.forEach(e => obj[e] = 0); return obj})({})});
  }

  /*
   * changePlayer function - sets the state blablabla
  */
  changePlayer = () => {
    this.setState(prevState => ({next: (prevState.next + 1) % prevState.order.length}))
  }
 changeNumOfPlayers = () => {
   this.setState({numOfPlayers: this.refs.players.value})
}
  checkWinner(a,x,v){
    // creating mapper to blablabla
    const mapper=indices=>indices.map(e=>a[e]?a[e][2]?a[e][2]:"D":"");
    let one=a.slice(x-4,x).map(e=>e[2]?e[2]:"D").concat(v,a.slice(x+1,x+5).map(e=>e[2]?e[2]:"D")).join("");
    let b2=[], e2=[], b3=[], e3=[], b4=[], e4=[];
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
    // [one, two, three, four].some(e=>reg.test(e))
    var winner=reg.test(one)||reg.test(two)||reg.test(three)||reg.test(four);
    if(winner) {this.setState(prevState=>{let x=prevState.score; x[v]+=1;return {
      next:"",winner:v,score: x}})};
      // this.setState({
      //   next: "",
      //   winner: v,
      //   score: {
      //     ...this.state.score,
      //     [x]: this.state.score[x] + 1
      //   }
      // });

  };
  playAgain = _ => {
    this.setState({winner: "", update: true, next: 0});
  }
  reset(){
    let players = randGen(this.refs.players.value || this.state.numOfPlayers);
    this.setState({
      numOfPlayers: this.refs.players.value || this.state.numOfPlayers,
      winner: "",
      next: 0,
      order: players,
      score: (obj => {players.forEach(e => obj[e] = this.state.score[e] || 0); return obj})({}),
      size: this.refs.size.value || this.state.size,
      update: true,
      before: ""});
  };


  toggleVisibility = el => {/hidden/.test(el.className) ?
    el.className = el.className.replace(/hidden/,"") :
    (el.className += " hidden");
    el === this.refs.optionsOuter &&
    this.hideIfNotHidden(this.refs.optionsInner) &&
    this.hideIfNotHidden(this.refs.infoContainer)}

  hideIfNotHidden = el => {!(/hidden/.test(el.className)) &&
    (el.className += " hidden"); return true}

  completeReset = _ => {
    let players = randGen(this.refs.players.value ||this.state.numOfPlayers);
    this.setState({
      numOfPlayers: this.refs.players.value || this.state.numOfPlayers,
      winner: "",
      next: 0,
      order: players,
      score: (obj => {players.forEach(e => obj[e] = 0); return obj})({}),
      size: this.refs.size.value || this.state.size,
      update: true
    });
  }

  updateToFalse = _ => this.setState({update: false});

  render(){
    return(
      <div className="wrapper">
        <div className="header">TIC - TAC - TOE</div>
        <div className="main">
          <div className="bar">
            <div onClick={()=>this.toggleVisibility(this.refs.optionsOuter)}
              className="menu">&#9776;</div>
            <div className="options hidden" ref="optionsOuter">
              <div ref="playButton" className="play underline" onClick={this.play}>PLAY</div>
              <div ref="infoButton" className="info underline" onClick={
                ()=>this.toggleVisibility(this.refs.infoContainer)}>INFO</div>
              <div className="optionsContainer hidden" ref="infoContainer">
                <div className="infoOuter">PLAYERS: {[...this.state.order].join(", ")}</div>
                <div className="outerScore"><div className="infoOuter">SCORE:</div>
                <Score className="infoInner" players={this.state.order} score={this.state.score}/>
              </div></div>
              <div onClick={()=>this.toggleVisibility(this.refs.optionsInner)}
                className="reset underline">RESET</div>
                <div className="optionsContainer hidden"ref="optionsInner">
                  <div className="wrapper1">
                    <div className="label1">NUMBER OF PLAYERS<br></br>
                      (2 to 5 players)</div>
                    <div className="input"><input type="number" ref="players"
                      placeholder={this.state.numOfPlayers}
                      min="2" max="5" onChange={this.changeNumOfPlayers}/></div></div>
                  <div className="wrapper2">
                    <div className="label2">SIZE OF THE GRID<br></br>(5 to 20 squares per side)</div>
                    <div className="input"><input type="number" className="input2" min="5" max="20" ref="size" placeholder={this.state.size}/></div>
                 </div>
                 <div className="label3 underline">RESET THE SCORE</div>
              </div>
            </div>
          </div>
            <div className="grid">
              <Grid
                nextMove={this.state.order[this.state.next]} onClick={this.changePlayer}
                check={this.checkWinner}winner={this.state.winner}
                size={this.state.size}
                update={this.state.update} updateToFalse={this.updateToFalse}
                before={this.state.before}/>
            </div>
          </div>
      </div>
    )
  }
}
export default Game;
