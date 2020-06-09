import * as Actions from '../actions';

const initialState = {
    partyList: [],
    partyInfo: {}
};

const partyReducer = function(state = initialState, action) {
    switch (action.type) {
        case Actions.GET_PARTY_LIST:
            return {
                ...state,
                partyList: action.payload
            };
        case Actions.CREATE_PARTY:
            return {
                ...state,
                partyList: action.payload
            };
        case Actions.UPDATE_PARTY_MEMBER:
            return {
                ...state,
                partyList: action.payload
            };
        default:
            return state;
    }
}

export default partyReducer;