import React from 'react';

const StartGame = props => props.alert ?
  (<div className="banner">Press PLAY for a new game or RESET for a new game
    with changed settings</div>) :
  null

export default StartGame;
