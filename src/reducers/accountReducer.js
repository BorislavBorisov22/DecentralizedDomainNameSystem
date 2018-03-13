import { WEB3_RECEIVE_ACCOUNT, WEB3_CHANGE_ACCOUNT } from './../actions/actionTypes';
import initialState from './initialState';


function accountReducer(state = initialState.account, action) {
    switch(action.type) {
        case WEB3_RECEIVE_ACCOUNT:
            return action.address;
        case WEB3_CHANGE_ACCOUNT:
            return action.address;
        default:
            return state;
    }
}

export default accountReducer;