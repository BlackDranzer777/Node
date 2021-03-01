import * as actionTypes from '../actions'

const initialState = {
    searchValue: '',
    categoryValue: ''
}

const filteredItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETSEARCH: 
            return{
                searchValue: action.payload
            }
        case actionTypes.SETCATEGORY: 
            return{
                categoryValue: action.payload
            }
        default:
            return state;
    }
}

export default filteredItemsReducer;