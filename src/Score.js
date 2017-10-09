import React from 'react';
import './index.css';

//TODO refactor for props to handle both an array of names and score or an array of objects

export const Name = props => <p>Player {props.player}</p>
export const Points = props => <p className={props.player}>:{' '}{props.score}</p>
const Score = props => <div className="score">{[...props.players].map(e=>(<div
  className="innerScore">
  <Name player = {e}/><Points player={e} score={props.score[e]}/></div>))}</div>
export default Score;
