class Auth {
    constructor(cookie) {
        this.token = ( cookie && Object.keys(cookie).length > 0) ? cookie.token : '' ;
    }

    isLoggedIn() {
        return ( this.token.length > 0 );
    }
}

module.exports = Auth;