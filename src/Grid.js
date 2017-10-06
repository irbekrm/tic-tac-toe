import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import './index.css';
import InputSize from './InputSize.js';

class Grid extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {squares: (_=>{var s=[];
      for(let i = 0; i < this.props.width; i++){
        for(let j = 0; j< this.props.height; j++) s.push([i*40,j*40,""])
      }; return s})(),
      ctx: null
  }
}
  componentDidMount(){
     let canvas = findDOMNode(this.refs.canvas),
      ct = canvas.getContext("2d");
    this.state.squares.forEach(square=>{
      ct.beginPath();
      ct.strokeRect(square[0],square[1],40,40)
    });
    this.setState({ctx: ct});
  }
  handleClick(event){
    var c = findDOMNode(this.refs.canvas);
    var ct = c.getContext("2d");
    var a = ~~((event.clientY-c.getBoundingClientRect().top)/40);
    var b= ~~((event.clientX-c.getBoundingClientRect().left)/40);
    var d= 10*a+b;
    if(!(this.state.squares[d][2]||this.props.winner)){
      this.setState(prevState=>{prevState.squares[d][2]=this.props.nextMove; return {squares:prevState.squares}});
      ct.fillText(this.props.nextMove,b*40+17,a*40+25);
      this.props.check(this.state.squares,d,this.props.nextMove);
      this.props.onClick();
    }
  }
  render(){
    return(
      <div>
        <canvas className="canvas" ref="canvas" width={this.props.width*40+""}
          height={this.props.height*40+""}
        onClick={this.handleClick}/>
        <InputSize height={this.props.height}
          width={this.props.width}/>
      </div>
    )
  }
};
export default Grid;
