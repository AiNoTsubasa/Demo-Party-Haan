import axios from 'axios';
import Cookies from 'js-cookie';

class ApiProxy {
    
    constructor() {
        this.API_URL = `${window.location.origin}/api`;
        this.USER_TOKEN = Cookies.get('token');
    }

    sendRequest(method, endPoint, json) {
        return axios({
            method: method,
            url: this.API_URL + endPoint,
            headers: {
                Authorization: `Bearer ${this.USER_TOKEN}`
            },
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

export default ApiProxy;