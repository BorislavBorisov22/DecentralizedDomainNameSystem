
import { SEARCH_DOMAIN_SUCCESS, SEARCH_DOMAIN_CLEAR } from './../actions/actionTypes';
import initialState from './initialState';

export default function searchDomainReducer(state = initialState.searchedDomain, action) {
    switch(action.type) {
        case SEARCH_DOMAIN_SUCCESS: 
            return Object.assign({}, action.domain);
        case SEARCH_DOMAIN_CLEAR:
            return initialState.searchedDomain;
        default:
            return state;
    }
}