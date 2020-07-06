import React from 'react';

import Auxi from '../../../hoc/Auxi/Auxi';

import Button from '../../UI/Button/Button';


const orderSummary = (props) => {
    const summaryIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
    return (<li key= {igKey}>
             <span style={{textTransform : 'capitalize'}} >{igKey}</span>: {props.ingredients[igKey]}
        </li>);
    })
    return(
        <Auxi>
            <h3>Your Order</h3>
            <p>Burger with : </p>
            <ul>{summaryIngredients}</ul>
    <p><strong>Total Price : {props.price}</strong></p>
            <p>proceed to checkout</p>
            <Button btnType = 'Danger' clicked ={props.cancelOrder}>Cancel</Button>
            <Button btnType = 'Success' clicked ={props.confirmOrder}>Continue</Button>

        </Auxi>
    );
};

export default orderSummary;