import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {
  /*
state = {

ingredients: null,
totalPrice:0

}
*/

checkoutCancelledHandler= () => {
this.props.history.goBack();

}
/*
componentWillMount() {
const query = new URLSearchParams(this.props.location.search);
const ingredients = {};
let price = 0;
for(let param of query.entries()) {
if(param[0] === 'price'){
  price = param[1];
}
else {

  ingredients[param[0]] = +param[1];
}

}

  this.setState({ingredients: ingredients, totalPrice: price});
}
*/

checkoutContinuedHandler= () => {

this.props.history.replace('/checkout/contact-data');
}


render() {
   return (
    <div>

<CheckoutSummary
ingredients={this.props.ings}
onCheckoutCancelled={this.checkoutCancelledHandler}
onCheckoutContinued={this.checkoutContinuedHandler}

/>
<Route path={this.props.match.url + '/contact-data'}
 component={ContactData} />
    </div>


   );


}



}
const mapStateToProps = state => {

return {

  ings: state.ingredients
}

}




export default connect(mapStateToProps)(Checkout);
