import * as actionTypes from '../actions/actionTypes';


const INGREDIENT_PRICES = {
salad: 1.2,
cheese: 0.8,
bacon:1.3,
meat: 0.9

}

const intialState = {
  ingredients: null,
  totalPrice: 4,
  error: false




};

const reducer = (state = intialState, action) => {

switch (action.type) {

case actionTypes.ADD_INGREDIENT:
return {

...state,
ingredients: {
...state.ingredients,
[action.ingredientName]: state.ingredients[action.ingredientName]+1

},
totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]

};
case actionTypes.REMOVE_INGREDIENT:
return {

...state,
ingredients: {
  ...state.ingredients,
  [action.ingredientName]: state.ingredients[action.ingredientName]-1

},
totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]


}

case actionTypes.SET_INGREDIENTS:
 return {
...state,
ingredients: action.ingredients,
error: false,
totalPrice: intialState.totalPrice

 }

case actionTypes.FETCH_INGREDIENTS_FAILED:

 return {

   ...state,
   error: true
 }
default:
return state;



}


};

export default reducer;
