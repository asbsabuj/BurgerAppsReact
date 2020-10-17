import * as actionTypes from '../actions/actionTypes';

const initialState ={
    order :[],
    laoding :false,
    purchased : false
}

const reducer = (state = initialState, action) =>{
    switch(action.types) {
        case (actionTypes.PURCHASE_INIT) :
            return {
                ...state,
                puchased: false
            }

        case (actionTypes.PURCHASE_BURGER_START):
            return{
                ...state,
                loading : true
            }

        case (actionTypes.PURCHASE_BURGER_SUCCESS) :

        const newOrder = {
            ...action.orderData,
            id :action.orderId,
            purchased :true
        }
            return {
                ...state,
                loading :false,
                orders : state.order.concat(newOrder)
            }
        
        case (actionTypes.PURCHASE_BURGER_FAIL) : 
            return{
                ...state,
                loading :false
            }

        default : 
            return state
    }
}

export default reducer;