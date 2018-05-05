import React from 'react';
import classes from './Input.css';
const input = (props) => {

let inputElement = null;
const inputClasses = [classes.InputElement];
console.log('invalid value   '+props.inValid);
let valErr = null;
if(props.inValid && props.shouldValidate && props.touched) {
  inputClasses.push(classes.Invalid);
  valErr = <p>Enter valid value </p>
}

switch(props.elementType) {
  case ('input'):
    inputElement = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elementConfig} />
    break;
  case ('textarea'):
    inputElement = <textarea onChange={props.changed} className={inputClasses.join(' ')}{...props.elementConfig} />
    break;
  case ('select'):
     inputElement = (
       <select
      className={classes.InputElement}
      value={props.value}
      onChange={props.changed} >
      {props.elementConfig.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
       </select>
     );
     break;
  default:
    inputElement = <input className={classes.InputElement}{...props.elementConfig} />
}

return (

  <div className={classes.Input}>

  <label className={classes.Label}>{props.label}</label>
 {inputElement}
 {valErr}
  </div>

);


};

export default input;
