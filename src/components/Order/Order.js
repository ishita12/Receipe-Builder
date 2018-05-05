import React from 'react';
import classes from './Order.css';

const order = (props) => {
const ingredients =[];
console.log(props.ingredients);
for(let igName in props.ingredients ) {

ingredients.push({name: igName, amount: props.ingredients[igName]});

}

console.log(ingredients);
const ing = ingredients.map(ig => {
return <span
style={{textTransform: 'capatalize',
display:'inline-block',
margin: '0 8px',
color: 'pink'
}}

 key={ig.name}> {ig.name} {ig.amount} </span>;

});

return (


  <div className={classes.Order}>
  <p>Ingredients: {ing}</p>
  <p>price: {Number.parseFloat(props.price).toFixed(2)} </p>


  </div>

);



};

export default order;
