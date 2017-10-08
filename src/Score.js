import React from 'react';

//TODO refactor for props to handle both an array of names and score or an array of objects

const Score = props => (
  <table id="score">
    <caption>Score</caption>
    <tr>
      <th>X</th> {/*TODO refactor with flexbox, add mapping*/}
      <th>O</th>
    </tr>
    <tr>
      <td>{props.x}</td>
      <td>{props.o}</td>
    </tr>
  </table>);

export default Score;
