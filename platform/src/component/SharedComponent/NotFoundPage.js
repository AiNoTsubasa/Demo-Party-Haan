import React, { Component } from 'react';
import '../../css/index.css';

class NotFoundPage extends Component {

	render() {
		return (
			<React.Fragment>
				<div className="flex flex-wrap justify-center p-24">
                    <div className="max-w-screen-lg flex flex-col">
                        <div className="text-6xl flex justify-center font-bold">404</div>
                        <div className="flex justify-center font-medium">Page Not Found!</div>
                    </div>
				</div>
			</React.Fragment>
		);
	}
	
}

export default NotFoundPage;
