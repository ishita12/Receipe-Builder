import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {

state = {
  orderForm: {
    name: {
      elementType: 'input',
      elementConfig: {
         type: 'text',
         placeholder: 'your name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
         type: 'text',
         placeholder: 'your street '
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
         type: 'text',
         placeholder: 'your zipcode'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
         type: 'text',
         placeholder: 'your country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
         type: 'email',
         placeholder: 'your email'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [{value: 'fastest', displayValue: 'fastest'},
                   {value: 'cheapest', displayValue: 'cheapest'}
                  ]
      },
      value: 'fastest',
      validation: {},
      valid: true
    }
  },

 formIsValid: false

}


checkValidity(value, rules) {

let isValid = true;
if(!rules) {
  return true;
}
if(rules.required) {
  isValid = value.trim() !== '' && isValid;
}
if(rules.minLength) {
  isValid = value.length >= rules.minLength  && isValid;
}

if(rules.maxLength) {
  isValid = value.length <=  rules.maxLength  && isValid;
}

return isValid;




}

orderHandler = (event) => {
  // preventing the default behavior of sending the request and reloading the form
event.preventDefault();

//this.state.loading=true;
const formData = { };
for (let formEL in this.state.orderForm) {
  formData[formEL] = this.state.orderForm[formEL].value;
}


const order = {
ingredients: this.props.ings,
price: this.props.price,
orderData: formData
}
console.log('line 138   '+order.ingredients);
this.props.onOrderBurger(order);
}

inputChangedHandler =(event, inputIdentifier) => {

const updatedOrderForm = {
  ...this.state.orderForm
};
const updatedFormElement = {
  ...updatedOrderForm[inputIdentifier]
};
updatedFormElement.value = event.target.value;
updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
updatedFormElement.touched = true;
updatedOrderForm[inputIdentifier] = updatedFormElement;

let formIsValid = true;

for(let inputIdentifier in updatedOrderForm) {
  formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
}

this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

}

render() {
let form = null;
if(this.props.loading){
  form = <Spinner />
} else {

const formElementArray = [];
for(let key in this.state.orderForm) {
  formElementArray.push({
    id: key,
    config: this.state.orderForm[key]
  });
}


  form = (

    <form onSubmit={this.orderHandler}>

  {formElementArray.map(formElement => (
<Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={(event) => this.inputChangedHandler(event, formElement.id)}
inValid={!formElement.config.valid}
shouldValidate={formElement.config.validation}
touched={formElement.config.touched}
/>

))}

    <Button disabled={!this.state.formIsValid} btnType="Success"> Order </Button>






    </form>
  );
}
return (

<div className={classes.ContactData}>
<h3>Enter your details </h3>
{form}
</div>
);

}


}



const mapStateToProps = state => {

return {
ings: state.burgerBuilder.ingredients,
price: state.burgerBuilder.totalPrice,
loading: state.order.loading

};

};

const mapDispatchToProps = dispatch => {

return {

  onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))


};
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
