import axios from 'axios';

class ExternalProxy {
    
    // constructor() {
    // }

    sendRequest(method, endPoint, json={}, headers={}) {
        return axios({
            method: method,
            url: endPoint,
            headers: headers,
            data: json
        }).then((result) => {
            // console.log("response api server ", result);
            return result;
        }).catch( (err) => {
            // console.log("error while requesting api server " + err);
            throw (err);
        });

    }
    
}

export default ExternalProxy;