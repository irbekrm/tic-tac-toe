import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

class Grid extends Component{
  componentDidMount(){
    let canvas = findDOMNode(this.refs.canvas),
      ctx = canvas.getContext("2d");
  }
  render(){
    return(
      <canvas ref="canvas" width="400" height="400"/>
    )
  }
};
export default Grid;
