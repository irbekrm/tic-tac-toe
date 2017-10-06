import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import './index.css';

class Grid extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {squares: (_=>{var s=[];
      for(let i = 0; i < 10; i++){
        for(let j = 0; j< 10; j++) s.push([i*40,j*40,""])
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
    var d= +(a+""+b);
    if(!(this.state.squares[d][2]||this.props.winner)){
      this.setState(prevState=>{prevState.squares[d][2]=this.props.nextMove; return {squares:prevState.squares}});
      ct.fillText(this.props.nextMove,event.clientX,event.clientY);
      this.props.check(this.state.squares,d,this.props.nextMove);
      this.props.onClick();
    }
  }
  render(){
    return(
      <canvas className="canvas" ref="canvas" width="400" height="400"
      onClick={this.handleClick}/>
    )
  }
};
export default Grid;
