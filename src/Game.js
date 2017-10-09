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
      width:13,
      height:13,
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

  start = _ => {
    this.hide(this.refs.startButton);
    this.show(this.refs.playButton, this.refs.hiddenContainer);
    this.reset();
  }
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
      width: this.refs.width.value || this.state.width,
      heigth: this.refs.height.value || this.state.height,
      update: true

    });
  }
  completeReset = _ => {
    let players = randGen(this.refs.players.value ||this.state.numOfPlayers);
    this.setState({
      numOfPlayers: this.refs.players.value || this.state.numOfPlayers,
      winner: "",
      next: 0,
      order: players,
      score: (obj => {players.forEach(e => obj[e] = 0); return obj})({}),
      width: this.refs.width.value || this.state.width,
      height: this.refs.height.value || this.state.height,
      update: true
    });
  }

  updateToFalse = _ => this.setState({update: false});

  show = (...elements) => elements.forEach(e => e.className =
    e.className.replace(/hidden/,""));

  hide = (...elements) => elements.forEach(e => e.className += "hidden");

  render(){
    return(
      <div className="page">
        <h1 className="header">TIC - TAC - TOE</h1>
        <div className="whole">
          <div className="grid">
            <Grid
              nextMove={this.state.order[this.state.next]} onClick={this.changePlayer}
              check={this.checkWinner}winner={this.state.winner}
              width={this.state.width} height={this.state.height}
              update={this.state.update} updateToFalse={this.updateToFalse}/>
          </div>
          <div className="notGrid">
            <h3 className="header1">SETUP (optional)</h3>
            <div className="setup1">
              <div className="label">Choose the number of players (2 - 5):</div>
              <input className="input" type="number" ref="players"
                placeholder={this.state.numOfPlayers}
                min="2" max="5" onChange={this.changeNumOfPlayers}/></div>
           <div className="setup2">
             <div className="label">Change the height of the canvas (5 - 100 squares): </div>
             <input className="input" ref="height"placeholder={this.state.height}/>
          </div>
          <div className="setup3">
            <div className="label">Change the width of the canvas (5 - 100 squares): </div>
            <input className="input" ref="width" placeholder={this.state.width}/>
          </div>
          <button onClick={this.start} ref="startButton">Start</button>
          <button className="hidden" ref="playButton"
            onClick={this.playAgain}>Play again</button>
          <div className="hidden" ref="hiddenContainer">
          <div className="reset1">
            <button className="resetButton" onClick={this.reset}>Reset 1</button>
            <p>-{' '}(Partial reset- reset the number of players and size of grid,
              keep the score)</p>
          </div>
          <div className="reset2">
            <button className="resetButton" onClick={this.completeReset}>Reset 2</button>
            <p>-{' '}(Complete reset- reset the number of players, the size of
              the grid and the score)</p>
          </div>
          <h3 className="header3">INFO </h3>
          <div>Current players: {[...this.state.order].join(", ")}</div>
          <div>Next move: {this.state.order[this.state.next]}</div>
          <div>Winner: {this.state.winner}</div>
          <div className="scoreTable">
            <h3 className="header3">SCORE</h3>
            <Score players={this.state.order} score={this.state.score}/>
          </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Game;
