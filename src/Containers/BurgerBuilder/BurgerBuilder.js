import React, {Component} from 'react';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modals from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad : 10,
    bacon : 35,
    cheese : 20 ,
    meat : 40
};

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 1,
            bacon :1,
            cheese :1,
            meat : 1 
        },
        totalPrice : 140,
        purchasable : true,
        order : false
    }

    updatePurchaseBurger(ingredients){
       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum,el) =>{
                return sum +el;
            },0);
        this.setState({
                purchasable : sum > 0
            });
            
    }    

    orderHandler = () => {
        this.setState ({
            order : true
        });
    }

    orderCancelHandler = () =>{
        this.setState({order : false});
    }

    orderConfirmHandler =() =>{
        alert('you have confirmed!');
    }

    IngredientsAddHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdding = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdding;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients})
        this.updatePurchaseBurger(updatedIngredients);
    };

    IngredientsRemoveHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const pricededucting = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - pricededucting;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients})
        this.updatePurchaseBurger(updatedIngredients);
    };
    

    render() {
        const disableInfo= {...this.state.ingredients};
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return(
            <Auxi>
                <Modals show ={this.state.order}
                modalClosed = {this.orderCancelHandler}>
                    <OrderSummary 
                    cancelOrder= {this.orderCancelHandler}
                    confirmOrder ={this.orderConfirmHandler}
                    price ={this.state.totalPrice}
                    ingredients = {this.state.ingredients}/>
                </Modals>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    addIngredients = {this.IngredientsAddHandler}
                    removeIngredients = {this.IngredientsRemoveHandler}
                    disabled = {disableInfo}
                    purchased = {this.state.purchasable}
                    ordered = {this.orderHandler}
                    price = {this.state.totalPrice}
                    
                    />
            </Auxi>
        );
    }
};
    

export default BurgerBuilder;