import React from 'react';
import './index.css';

const PlayersList = props => props.order.map((e,i) => i === props.next ?
  (<span className="red">{e}{' '}</span>) : (<span>{e}{' '}</span>));

export default PlayersList;
