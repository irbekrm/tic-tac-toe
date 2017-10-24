import React from 'react';

const WinnerAlert = props => props.winner ?
  (<p className="winnerAlert red">Winner of this round is {props.winner}. Press PLAY to continue
    or RESET to play again with different settings</p>) :
    null
export default WinnerAlert;
