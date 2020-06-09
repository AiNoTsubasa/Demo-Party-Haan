import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './store/actions';
import Cookies from 'js-cookie';
import ExternalProxy from './utils/ExternalProxy';

import Header from './component/SharedComponent/Header';
import LoadingScreen from './component/SharedComponent/LoadingScreen';
import AppRouter from './component/Route/AppRouter';

class App extends Component {

    state = {
        userID: ''
    };

    componentDidMount() {
        const token = Cookies.get('token');
        const externalProxy = new ExternalProxy();
        const decodeTokenUrl = `${window.location.origin}/decodeToken/${token}`;
        externalProxy.sendRequest('GET', decodeTokenUrl).then( (response) => {
            const decodeToken = response.data;
            const userID = decodeToken.userID;
            if( userID.length > 0 ) {
                const userInfo = {
                    userID: userID,
                    email: decodeToken.email,
                    role: decodeToken.role
                };
                this.props.setUserState(userInfo);
                this.setState({ userID: userID });
            } else {
                Cookies.remove('token');
                window.location.href = "/login";
            }
        });
    }
    
    render() {

        const { userID } = this.state;

        return (
            <React.Fragment>
                { userID.length > 0 ? (
                    <React.Fragment>
                        <Header />
                        <AppRouter />
                    </React.Fragment>
                ) : (
                    <LoadingScreen />
                ) }
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUserState: Actions.setUserState,
    }, dispatch);
}

function mapStateToProps(state) {
	return {
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
