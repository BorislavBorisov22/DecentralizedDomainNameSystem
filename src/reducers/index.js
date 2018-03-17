import { combineReducers } from "redux";
import activeAddress from './accountReducer';
import searchedDomain from './searchDomainReducer';

const rootReducer = combineReducers({
    activeAddress,
    searchedDomain
});

export default rootReducer;