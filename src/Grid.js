import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import './index.css';

class Grid extends Component{
  componentDidMount(){
    let canvas = findDOMNode(this.refs.canvas),
      ctx = canvas.getContext("2d");
    const squares=Array(100);
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++) squares.push([i*40,j*40])
    }
    squares.forEach(square=>{
      ctx.beginPath();
      ctx.strokeRect(square[0],square[1],40,40)
    })
  }
  render(){
    return(
      <canvas className="canvas" ref="canvas" width="400" height="400"/>
    )
  }
};
export default Grid;
