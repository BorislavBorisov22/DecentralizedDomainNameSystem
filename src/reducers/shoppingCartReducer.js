import initialState from "./initialState";
import { ADD_DOMAIN_TO_CART } from "../actions/actionTypes";

export default function shoppingCartReducer(state = initialState.shoppingCart, action) {
    switch(action.type) {
        case ADD_DOMAIN_TO_CART:
            return [...state, Object.assign({}, action.domain)];
        default:
            return state;
    }
}