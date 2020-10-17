import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/COntactData/ContactData';

class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutConfirmedHandler = () => {
        this.props.history.replace('/checkout/contact')
    }
    

    render(){
        let summary = <Redirect to = '/' />
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to = '/' /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients ={this.props.ings}
                        checkoutCancel ={this.checkoutCancelledHandler}
                        checkoutConfirm ={this.checkoutConfirmedHandler}/>
                    <Route path = {this.props.match.path + '/contact'} 
                        component ={ContactData} />
                </div>
            )
        } 
        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ings : state.BurgerBuilder.ingredients,
        purchased : state.Order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);