import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
return (

<div className={classes.CheckoutSummary}>
<h1>Here is your burger </h1>

<div style={{width: '300px', height: '300px', margin: 'auto'}}>

<Burger   ingredients={props.ingredients} />

</div>
<Button btnType="Danger" clicked={props.onCheckoutCancelled}>Cancel</Button>
<Button btnType="Success" clicked={props.onCheckoutContinued}>Submit</Button>
</div>

);

}

export default checkoutSummary;
