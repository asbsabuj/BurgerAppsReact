import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modals from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index' ;


class BurgerBuilder extends Component {

    state = {   
        order : false,
    }

    componentDidMount(){
        console.log(this.props)
        this.props.oninitIngredients()
        
    }

    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey];
            })
            .reduce((sum,el) =>{
                return sum +el;
            },0);
            return sum > 0;
        
            
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
         this.props.onPurchaseInIt()
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo= {...this.props.ings};
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let burger = this.props.error ? <p>ingredients can't load !!</p> : <Spinner/>
        let orderSummary =null;

        if (this.props.ings) {
            burger = (
                <Auxi>
                <Burger ingredients = {this.props.ings}/>
                <BuildControls 
                    addIngredients = {this.props.onIngredientAdded}
                    removeIngredients = {this.props.onIngredientRemoved}
                    disabled = {disableInfo}
                    purchased = {this.updatePurchaseState(this.props.ings)}
                    ordered = {this.orderHandler}
                    price = {this.props.price}
                    />
                </Auxi>
                )

            orderSummary = <OrderSummary 
                cancelOrder= {this.orderCancelHandler}
                confirmOrder ={this.orderConfirmHandler}
                price ={this.props.price}
                ingredients = {this.props.ings}/>
            
        }
        

        return(
            <Auxi>
                <Modals show ={this.state.order}
                modalClosed = {this.orderCancelHandler}>
                   {orderSummary}
                </Modals>
                {burger}
            </Auxi>
        );
    }
};
    
const mapStateToProps = state =>{
    return {
        ings : state.BurgerBuilder.ingredients,
        price : state.BurgerBuilder.totalPrice,
        error : state.BurgerBuilder.error
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        oninitIngredients : ()=> dispatch(actions.initIngredients()),
        onPurchaseInIt : () => dispatch (actions.purchaseInIt())

    }
} 


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));