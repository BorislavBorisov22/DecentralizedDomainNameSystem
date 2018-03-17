
import { SEARCH_DOMAIN_SUCCESS } from './../actions/actionTypes';
import initialState from './initialState';

export default function searchDomainReducer(state = initialState.searchedDomain, action) {
    switch(action.type) {
        case SEARCH_DOMAIN_SUCCESS: 
            return Object.assign({}, action.domain);
        default:
            return state;
    }
}