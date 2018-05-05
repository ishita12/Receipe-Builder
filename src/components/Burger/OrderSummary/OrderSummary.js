import React, { Component } from 'react';
import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
//this should be a functionl component
render() {
  const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {

    return (
      <li key={igKey}>
      <span style={{textTransform: 'capatalize'}}>{igKey} </span>: {this.props.ingredients[igKey]}
      </li>);
  });
  return (

  <Auxx>

  <h3>Your order </h3>

  <p>You have added these ingredients to your burger:</p>

  <ul>
  {ingredientSummary}

  </ul>
  <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
  <p>Continue to checkout ?</p>
  <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
  <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
  </Auxx>


  );



}










}
export default OrderSummary;
