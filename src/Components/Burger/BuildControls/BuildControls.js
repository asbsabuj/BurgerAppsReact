import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label : 'Salad' , type : 'salad'},
    {label : 'Bacon' , type : 'bacon'},
    {label : 'Cheese' , type :'cheese'},
    {label : 'Meat' , type : 'meat'}

];
    
const BuildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Total Price : bdt <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                added = {()=> props.addIngredients(ctrl.type)}
                removed = {()=> props.removeIngredients (ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
                />
        ) )}
        <button 
            className ={classes.OrderButton}
            disabled = {!props.purchased}
            onClick = {props.ordered}>Order
            </button>
    </div>
);

export default BuildControls;