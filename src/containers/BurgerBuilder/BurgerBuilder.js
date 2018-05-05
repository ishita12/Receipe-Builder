
import React, { Component } from 'react';
import Auxx from '../../hoc/Auxx';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

state = {

purchasable: false,
purchasing: false,
loading: false,
error: false

}


componentDidMount() {
/*
axios.get('https://react-burger-2e4b7.firebaseio.com/ingredients.json').then(response => {
this.setState({ingredients: response.data});


}).catch(error => {});
this.setState({error: true});*/
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
this.setState({purchasable: sum > 0});
}


purchaseHandler =()=> {


  this.setState({purchasing: true});
}

purchaseCancelHandler = () => {

this.setState({purchasing: false});

}
purchaseContinueHandler = () => {

//alert('you have continued');
/*

*/
const queryParams = [];
for(let i in this.state.ingredients) {
  queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
}
queryParams.push('price=' + this.state.totalPrice);
const queryString = queryParams.join('&');
this.props.history.push({

pathname: '/checkout',
search: '?' + queryString,


});


}

render () {

const disabledInfo = {
...this.state.ingredients

};

for(let key in disabledInfo){

  disabledInfo[key]= disabledInfo[key] <= 0;
}
let orderSummary = null;


if(this.state.loading){
  orderSummary = <Spinner />
}
let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />

if(this.props.ings){
  burger = (
 <Auxx>
 <Burger ingredients={this.props.ings}/>
 <BuildControls  ingredientAdded={this.props.onIngredientAdded}
 ingredientRemoved={this.props.onIngredientRemoved}
 disabled={disabledInfo}
 price={this.props.price}
 purchasable={this.state.purchasable}
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
ings: state.ingredients,
price: state.totalPrice

  }
}



const mapDispatchToProps = dispatch => {

return {
onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

}

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
