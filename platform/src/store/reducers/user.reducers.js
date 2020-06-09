import * as Actions from '../actions';

const initialState = {
    userInfo: {}
};

const partyReducer = function(state = initialState, action) {
    
    switch (action.type) {
        case Actions.GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        case Actions.SET_USER_STATE:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return state;
    }
}

export default partyReducer;