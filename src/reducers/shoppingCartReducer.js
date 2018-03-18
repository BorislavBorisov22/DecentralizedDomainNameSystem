import initialState from "./initialState";
import { ADD_DOMAIN_TO_CART, REMOVE_DOMAIN_FROM_CART, ADD_IP_TO_DOMAIN, BUY_DOMAIN_SUCCESS } from "../actions/actionTypes";

export default function shoppingCartReducer(state = initialState.shoppingCart, action) {
    switch(action.type) {
        case ADD_DOMAIN_TO_CART:
            return [
                ...state.filter(domain => domain.domainName !== action.domain.domainName),
                Object.assign({}, action.domain)
            ];
        case REMOVE_DOMAIN_FROM_CART:
            return state.filter(domain => domain.domainName !== action.domain.domainName);
        case ADD_IP_TO_DOMAIN:
            return state.map(domain => {
                const currDomain = domain.domainName === action.domain.domainName ? action.domain : domain;
                return Object.assign({}, currDomain);
            });
        case BUY_DOMAIN_SUCCESS:
            return state.filter(domain => domain.domainName !== action.domain.domainName);
        default:
            return state;
    }
}