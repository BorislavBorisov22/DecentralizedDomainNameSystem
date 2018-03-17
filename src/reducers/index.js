import { combineReducers } from "redux";
import activeAddress from './accountReducer';
import searchedDomain from './searchDomainReducer';
import shoppingCart from './shoppingCartReducer';

const rootReducer = combineReducers({
    activeAddress,
    searchedDomain,
    shoppingCart
});

export default rootReducer;