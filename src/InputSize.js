import React from 'react';

const InputSize=props=><div><label for="height">Height (number of squares): </label>
<input id="height" type="number" placeholder = {props.height}/><p></p>
<label for="width">Width (number of squares): </label>
<input id="width" type="number" placeholder = {props.width}/></div>
export default InputSize;
