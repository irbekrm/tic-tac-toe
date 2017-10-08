import React from 'react';

//TODO(gs): add JSDocs
const InputSize=props=><div><label for="height">Height (number of squares): </label>
<input id="height" type="number" min="5" max="100" placeholder = {props.height}/><br />
<label for="width">Width (number of squares): </label>
<input id="width" min="5" max="100" type="number" placeholder = {props.width}/></div>

export default InputSize;
