import { combineReducers } from "redux";
import activeAddress from './accountReducer';

const rootReducer = combineReducers({
    activeAddress
});

export default rootReducer;