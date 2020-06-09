import ApiProxy from '../../utils/ApiProxy';

export const GET_USER_INFO = 'GET USER INFO';
export const SET_USER_STATE = 'SET USER STATE';

export function getUserInfo(userID) {

    const apiProxy = new ApiProxy();
    let request = apiProxy.sendRequest('GET', `/user/userID/${userID}`);

    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type: GET_USER_INFO,
                payload: response.data
            })
        });
   
}

export function setUserState(userInfo) {
    
    return (dispatch) => dispatch({
        type: SET_USER_STATE,
        payload: userInfo
    });

}