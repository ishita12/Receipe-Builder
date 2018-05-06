
import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

state = {

purchasing: false

}

componentDidMount() {
  this.props.onInitIngredients();
}


//componentDidMount() {
/*

}
/*
addIngredientHandler = (type) => {

const oldCount = this.state.ingredients[type];
const updatedCount = oldCount + 1;

const updatedIngredients = {
...this.state.ingredients

}
updatedIngredients[type] = updatedCount;
const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice = oldPrice + priceAddition;
this.setState({
  ingredients: updatedIngredients,
  totalPrice: newPrice
})
this.updatePurchaseState(updatedIngredients);
}

removeIngredientHandler = (type) => {

  const oldCount = this.state.ingredients[type];
  if(oldCount <=0){
    return;
  }
  const updatedCount = oldCount - 1;

  const updatedIngredients = {
  ...this.state.ingredients

  }
  updatedIngredients[type] = updatedCount;
  const priceDeduction = INGREDIENT_PRICES[type];
  const oldPrice = this.state.totalPrice;
  const newPrice = oldPrice - priceDeduction;
  this.setState({
    ingredients: updatedIngredients,
    totalPrice: newPrice
  })


this.updatePurchaseState(updatedIngredients);
}
*/

updatePurchaseState(updatedIngredients){
const ingredients = updatedIngredients;
const sum = Object.keys(ingredients).map(igKey => {

  return ingredients[igKey];
}).reduce((sum, el) => {
  return sum + el;
}, 0);
return sum > 0;
}


purchaseHandler =()=> {


  this.setState({purchasing: true});
}

purchaseCancelHandler = () => {

this.setState({purchasing: false});

}
purchaseContinueHandler = () => {
/*
const queryParams = [];
for(let i in this.state.ingredients) {
  queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.state.totalPrice);
const queryString = queryParams.join('&');
search: '?' + queryString,
*/
this.props.onInitPurchase();
this.props.history.push('/checkout');

}

render () {

const disabledInfo = {
...this.props.ings

};
for (let key in disabledInfo) {

  console.log('disabled info   '+disabledInfo);
  disabledInfo[key]= disabledInfo[key] <= 0;
  console.log('line 128   '+disabledInfo[key]);
}
let orderSummary = null;


if(this.state.loading){
  orderSummary = <Spinner />
}
let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />

if(this.props.ings){
  burger = (
 <Auxx>
 <Burger ingredients={this.props.ings}/>
 <BuildControls  ingredientAdded={this.props.onIngredientAdded}
 ingredientRemoved={this.props.onIngredientRemoved}
 disabled={disabledInfo}
 price={this.props.price}
 purchasable={this.updatePurchaseState(this.props.ings)}
 ordered={this.purchaseHandler}
 />



 </Auxx>


 );
  orderSummary = <OrderSummary ingredients={this.props.ings} purchaseCanceled={this.purchaseCancelHandler}
 purchaseContinued={this.purchaseContinueHandler}
 price={this.props.price}
 />;
}


return (
<Auxx>
<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
{orderSummary}
</Modal>
{burger}
</Auxx>
);

}

}

const mapStateToProps = state => {
  return {
ings: state.burgerBuilder.ingredients,
price: state.burgerBuilder.totalPrice,
error: state.burgerBuilder.error

  }
}



const mapDispatchToProps = dispatch => {

return {
onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
}

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
