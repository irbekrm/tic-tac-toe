import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import './index.css';

class Grid extends Component{
  componentDidMount(){
    let canvas = findDOMNode(this.refs.canvas),
      ctx = canvas.getContext("2d");
    let xx=0, yy=0;
    ctx.beginPath();
    for(let j=0;j<10; j++){
     for(let i=0; i < 10; i++){
      ctx.moveTo(xx,yy);
      xx += 40;
      ctx.lineTo(xx,yy);
      yy += 40;
      ctx.lineTo(xx,yy);
      xx -= 40;
      ctx.lineTo(xx,yy);
    }
    yy=0;
    xx += 40;
  }
    ctx.stroke();
  }
  render(){
    return(
      <canvas className="canvas" ref="canvas" width="400" height="400"/>
    )
  }
};
export default Grid;
