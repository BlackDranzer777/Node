import * as actionTypes from '../actions'

const initialState = {
    billingItems: []
}

const billingItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD: 
            return{
                billingItems: [...state.billingItems, action.billingItem] 
            }
        case actionTypes.DELETE: 
        return{
            billingItems: [...state.billingItems.filter(billingItem => billingItem.id!==action.id)]
        }
        case actionTypes.INCREMENT: 
            return{
                billingItems: state.billingItems.map(billingItem => {
                    if(billingItem.id === action.id) {
                        billingItem.quantity += 1;
                    }
                    return billingItem;
                })
            }
        case actionTypes.DECREMENT: 
        return{
            billingItems: state.billingItems.map(billingItem => {
                if(billingItem.id === action.id) {
                    billingItem.quantity -= 1;
                }
                return billingItem;
            }) 
        }
        default:
            return state;
    }
}

export default billingItemsReducer;


