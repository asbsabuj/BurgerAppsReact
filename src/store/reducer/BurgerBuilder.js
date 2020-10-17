import * as actionTypes from '../actions/actionTypes';

const initialState ={
    ingredients : null,
    totalPrice : 140,
    error : false
}

const INGREDIENTS_PRICES = {
    salad : 10,
    bacon : 35,
    cheese : 20 ,
    meat : 40
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            }
        
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            }

        case actionTypes.SET_INGREDIENT:
            return{
                ...state,
                ingredients :{
                    salad : action.ingredients.salad,
                    bacon : action.ingredients.bacon,
                    cheese : action.ingredients.cheese,
                    meat : action.ingredients.meat
                },
                error : false
            }


        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return{
                ...state,
                error :true
            }

        default : 
        return state
    }
}

export default reducer;