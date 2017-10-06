import React from 'react';
const Score = props => <table id="score"><caption>Score</caption><tr><th>X</th><th>O</th></tr>
<tr><td>{props.x}</td><td>{props.o}</td></tr></table>;
export default Score;
