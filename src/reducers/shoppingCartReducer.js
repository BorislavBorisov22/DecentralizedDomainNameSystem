import initialState from "./initialState";
import { ADD_DOMAIN_TO_CART, REMOVE_DOMAIN_FROM_CART } from "../actions/actionTypes";

export default function shoppingCartReducer(state = initialState.shoppingCart, action) {
    switch(action.type) {
        case ADD_DOMAIN_TO_CART:
            return [
                ...state.filter(domain => domain.domainName !== action.domain.domainName),
                Object.assign({}, action.domain)
            ];
        case REMOVE_DOMAIN_FROM_CART:
            return state.filter(domain => domain.domainName !== action.domain.domainName)
        default:
            return state;
    }
}