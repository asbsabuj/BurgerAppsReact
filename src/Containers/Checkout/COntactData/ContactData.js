import React , { Component }from 'react';
import {connect} from 'react-redux';

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component{
    state ={
        orderForm : {
          
            name : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation : {
                    required : true
                } ,
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Street Name'
                },
                value :'',
                validation : {
                    required : true
                } ,
                valid : false,
                touched : false

            },
            block : {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Block Name'
                },
                value : '',
                validation : {
                    required : true,
                    minlength: 5,
                    maxlentgh : 5
                } ,
                valid : false,
                touched : false
            },
            area: {
                elementType : 'input',
                elementConfig : {
                    type : 'text',
                    placeholder : 'Area Name'
                },
                value : '',
                validation : {
                    required : true
                } ,
                valid : false,
                touched : false

            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type : 'email',
                    placeholder : 'Your E-mail'
                },
                value : '',
                validation : {
                    required : true
                } ,
                valid : false,
                touched : false
            },
            delivery : {
                elementType : 'select',
                elementConfig : {
                    options : [{value : 'fastest' , displayValue : 'Fastest'},
                              {value : 'cheapest' , displayValue : 'Cheapest'}]
            },
                valid : true,
                validation : {},
                value : 'fastest'
        }
    },
        formIsValid : false
    }

    orderHandler = (event)=> {
        event.preventDefault();
        
         const formData = {}
         for (let formElementIdentifier in this.state.orderForm){
             formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
         }
         const order = {
             ingredients : this.props.ings,
             price : this.props.price,
             orderData : formData  
         }

         this.props.onOrderBurger(order)
    }
         

    checkValidity (value, rules) {
        let isValid = true
        if (rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minlength){
            isValid = value.length == rules.minlength && isValid
        }

        if (rules.maxlength){
            isValid = value.length <= rules.maxlength && isValid
        }

        return isValid
    }

    inputChangedHandler =(event, inputIdentifier) =>{
        const updatedOrderForm = { 
            ...this.state.orderForm
        }

        const formUpdateElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        formUpdateElement.value = event.target.value
        formUpdateElement.valid = this.checkValidity(formUpdateElement.value, formUpdateElement.validation)
        formUpdateElement.touched = true
        updatedOrderForm[inputIdentifier] = formUpdateElement
        
        let formIsValid = true
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm : updatedOrderForm, formIsValid :formIsValid})
    }

    render(){
        const formElementArr = []
        for (let key in this.state.orderForm){
            formElementArr.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit ={this.orderHandler}>
                {formElementArr.map(formElement => (
                    <Input  key = {formElement.id}
                            elementType = {formElement.config.elementType}
                            elementConfig = {formElement.config.elementConfig}
                            value = {formElement.config.value}
                            invalid ={!formElement.config.valid}
                            shouldValidate ={formElement.config.validation}
                            touched ={formElement.config.touched}
                            changed = {(event)=> this.inputChangedHandler(event,formElement.id)} />
                ))}
                    <Button btnType = 'Success'  disabled = {!this.state.formIsValid}> Order </Button>
            </form>
        )
        if (this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>tour contact please !</h4>
               {form}
                
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings :state.BurgerBuilder.ingredients,
        price : state.BurgerBuilder.totalPrice,
        loading :state.Order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler( ContactData, axios));