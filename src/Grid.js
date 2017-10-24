import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import './index.css';

class Grid extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {squares: (_=>{var s=[];
      for(let i = 0; i < this.props.size; i++){
        for(let j = 0; j< this.props.size; j++) s.push([i*40,j*40,""])
      }; return s})()
  }
}
  componentDidMount(){
     let canvas = this.refs.canvas,
      ct = canvas.getContext("2d");
    this.state.squares.forEach(square=>{
      ct.beginPath();
      ct.strokeRect(square[0],square[1],40,40)
    });
    this.makeGame();
  }
  componentDidUpdate(){
    if(this.props.update){
      this.reset();
      this.props.updateToFalse();
    }
  }
  makeGame = _ => {
    let canvas = this.refs.canvas, ct = canvas.getContext("2d");
    ct.font = "20px Arial";
    [40,47,54,58,64,69,75,80,89,91].forEach(e => ct.fillText(
      "O",e % 12 * 40 + 13, ~~(e / 12) * 40 + 26));
    [76,77,78,79,42,43,44,63,61].forEach(e => ct.fillText(
      "X", e % 12 * 40 + 13, ~~(e / 12) * 40 + 26));
    let a = [91 % 12 * 40 + 13, ~~(91 / 12) * 40 + 26],
      b = [47 % 12 * 40 + 22, ~~(47 / 12) * 40 + 13];
    ct.strokeStyle = "red";
    ct.lineWidth = 2.0;
    ct.beginPath();
    ct.moveTo(a[0],a[1]);
    ct.lineTo(b[0],b[1]);
    ct.stroke();

  }
  handleClick(event){
    var c = this.refs.canvas;
    var ct = c.getContext("2d");
    var a = ~~((event.clientY-c.getBoundingClientRect().top)/40);
    var b = ~~((event.clientX-c.getBoundingClientRect().left)/40);
    var d = 10*a+b;
    if(!(this.state.squares[d][2]||this.props.winner)){
      this.setState(prevState=>{prevState.squares[d][2]=this.props.nextMove; return {squares:prevState.squares}});
      ct.font = "20px Arial";
      ct.fillText(this.props.nextMove,b*40+17,a*40+25);
      this.props.onClick();
      this.props.check(this.state.squares,d,this.props.nextMove);
    }
  }
  reset(){
    let a = this.props.size;
    let c = findDOMNode(this.refs.canvas);
    let ct = c.getContext("2d");
    c.height = a * 40;
    c.width = a * 40;
    let newSquares = (_=>{var s = [];
      for(let i = 0; i < a; i++){
        for(let j = 0; j < a; j++) s.push([i*40,j*40,""])
      }; return s})();
    this.setState({squares: newSquares});
    newSquares.forEach(square=>{
      ct.beginPath();
      ct.strokeRect(square[0],square[1],40,40)
    });
  }
  render(){
    return(
      <div>
        <canvas id="canvas" className="canvas" ref="canvas" width={this.props.size*40+""}
          height={this.props.size*40+""}
        onClick={this.handleClick}/>
      </div>
    )
  }
};
export default Grid;
