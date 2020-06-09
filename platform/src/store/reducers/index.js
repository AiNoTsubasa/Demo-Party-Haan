import { combineReducers } from 'redux';
import partyReducer from './party.reducers';
import userReducer from './user.reducers';

export default combineReducers({
    party: partyReducer,
    user: userReducer
})