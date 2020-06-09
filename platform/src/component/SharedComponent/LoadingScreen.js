import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../../css/index.css';

class LoadingScreen extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="flex flex-1 h-screen justify-center items-center">
					<CircularProgress size="4rem" />
				</div>
			</React.Fragment>
		);
	}
	
}

export default LoadingScreen;
