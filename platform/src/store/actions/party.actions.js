import ApiProxy from '../../utils/ApiProxy';

export const GET_PARTY_LIST = 'GET PARTY LIST';
export const CREATE_PARTY = 'CREATE PARTY';
export const UPDATE_PARTY_MEMBER = 'UPDATE PARTY MEMBER';

export function getPartyList() {

    const apiProxy = new ApiProxy();
    let request = apiProxy.sendRequest('GET', '/party/parties');

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_PARTY_LIST,
                payload: response.data
            })
        });
   
}

export function createParty(partyInfo, userID) {
    const apiProxy = new ApiProxy();

    partyInfo.members = [];
    partyInfo.members.push(userID);
    partyInfo.createdBy = userID;


    let request = apiProxy.sendRequest('POST', '/party/new', partyInfo);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: CREATE_PARTY,
                payload: {...response.data.partyList}
            })
        });
}

export function updatePartyMember(partyID, userID, action) {
    const updateData = {
        partyID: partyID,
        userID: userID,
        action: action
    };
    const apiProxy = new ApiProxy();
    let request = apiProxy.sendRequest('POST', '/party/updateMember', updateData);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: UPDATE_PARTY_MEMBER,
                payload: [...response.data.partyList]
            })
        });
}