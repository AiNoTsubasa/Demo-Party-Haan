import React, { Component } from 'react';
import { 
	IconButton,
	Tooltip,
	Button
} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../../css/index.css';

class Header extends Component {

	redirectToCreateParty = (event) => {
		event.preventDefault();
		window.location.href = "/create";
	}

	redirectToLogout = (event) => {
        event.preventDefault();
        window.location.href = "/logout";
    }

	render() {
		return (
			<React.Fragment>
				<nav className="flex flex-wrap justify-center p-6 main-bg">
					<div className="max-w-screen-lg flex flex-1 items-center justify-between flex-wrap">
						<div className="flex items-center flex-shrink-0 text-white mr-6">
							<a href="/" className="">
								<img alt="Party Haan" className="h-8 mr-4" src="https://www.partyhaan.com/src/assets/img/logo_text.e2f7f77c2b16bfd1e1e3109ab7662ed6.png" />
							</a>
						</div>
						<div className="flex md:hidden">
							<div className="flex">
								<Tooltip title="Create Party!">
									<IconButton
										aria-label="Create Party"
										onClick={this.redirectToCreateParty}
									>
										<AddCircleIcon className="text-white" />
									</IconButton>
								</Tooltip>
							</div>
							<div className="flex">
								<Tooltip title="Logout">
									<IconButton
										aria-label="Create"
										onClick={this.redirectToLogout}
									>
										<ExitToAppIcon className="text-white" />
									</IconButton>
								</Tooltip>
							</div>
						</div>
						<div className="hidden md:flex">
							<div className="flex mr-2">
								<Button onClick={this.redirectToCreateParty}>
									<div className="text-white font-semibold">Create Party</div>
								</Button>
							</div>
							<div className="flex">
								<Button onClick={this.redirectToLogout}>
									<div className="text-white font-semibold">LOGOUT</div>
								</Button>
							</div>
						</div>
					</div>
				</nav>
			</React.Fragment>
		);
	}
	
}

export default Header;
