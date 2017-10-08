import React from 'react';

export const playersNames = ["X","O","Y","Z","T"];

const randGen = numOfPlayers => {
  let names = playersNames.slice(0,numOfPlayers), i = names.length, j;
  for(; i;){j = ~~(Math.random() * i); [names[j], names[i]] = [names[--i],names[j]];}
  return names;
  }

export default randGen;
