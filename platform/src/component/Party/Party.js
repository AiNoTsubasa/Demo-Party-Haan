import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';

import { 
	Button,
	CircularProgress
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

import '../../css/index.css';
const _ = require('lodash');

class Party extends Component {

	state = {
		userInfo: {},
		partyInfo: {},
		isProcessing: false
	};

	componentDidMount() {
		this.setState({ userInfo: this.props.userInfo, partyInfo: this.props.partyInfo });
	}

	componentDidUpdate(prevProps, prevState) {
		if( this.props.partyInfo.hasOwnProperty('partyID') && !_.isEqual(this.state.partyInfo, this.props.partyInfo) ) {
			this.setState({ isProcessing: false, partyInfo: {...this.props.partyInfo} });
		}
	}

	handleLeavePartyBtn = (event) => {
		event.preventDefault();
		
		this.setState({ isProcessing: true }, () => {
			const { partyInfo, userInfo } = this.state;
			this.props.updatePartyMember(partyInfo.partyID, userInfo.userID, 'REMOVE');
		});
	}

	handleJoinPartyBtn = (event) => {
		event.preventDefault();

		this.setState({ isProcessing: true }, () => {
			const { partyInfo, userInfo } = this.state;
			this.props.updatePartyMember(partyInfo.partyID, userInfo.userID, 'ADD');
		});
	}

	render() {
		
		const { partyInfo, userInfo, isProcessing } = this.state;
		const countMember = partyInfo.hasOwnProperty('members') ? partyInfo.members.length : 0;

		return (
			<React.Fragment>
				{ partyInfo.hasOwnProperty('partyID') ? (

					<div className="w-1/2 md:w-1/3 lg:w-1/4 p-1 md:p-2">
						<div className="rounded overflow-hidden shadow-lg bg-white">
							<div className="relative h-32 sm:h-48">
								<div className="absolute right-0 border-none rounded-lg bg-black bg-opacity-25 text-white p-1 flex flex-row overflow-hidden w-12 justify-center mt-2 mr-2 sm:w-24 sm:justify-between sm:mt-4 sm:mr-4">
									<div className="hidden sm:flex sm:flex-auto sm:mr-2"><GroupIcon className="mr-1" />:</div>
									<div className="flex overflow-hidden">{countMember}/{partyInfo.maxMember}</div>
								</div>
								<img className="h-full w-full object-cover" src={partyInfo.partyImage} alt={partyInfo.partyName} />
							</div>
							<div className="px-2">
								<div className="px-2 py-2">
									<div className="font-semibold text-sm sm:text-lg break-all overflow-hidden card-title">{partyInfo.partyName}</div>
								</div>
								<div>
									<hr />
								</div>
								<div className="flex flex-1 px-2 py-3 justify-end">
									{ countMember === Number(partyInfo.maxMember) ? (
										<span className="cursor-not-allowed">
											<Button
												size="small"
												variant="contained"
												disabled
												color="secondary"
											>
												<PersonAddDisabledIcon />
												<div className="hidden sm:flex sm:ml-2">Full</div>
											</Button>
										</span>
									) : (
										isProcessing ? (
											<CircularProgress size="2rem" />
										) : (
											partyInfo.members.indexOf(userInfo.userID) > -1 ? (
												<Button
													size="small"
													variant="contained"
													color="secondary"
													onClick={this.handleLeavePartyBtn}
												>
													<RemoveIcon />
													<div className="hidden sm:flex sm:ml-2">Leave Party</div>
												</Button>
											) : (
												<Button
													size="small"
													variant="contained"
													color="primary"
													onClick={this.handleJoinPartyBtn}
												>
													<AddIcon />
													<div className="hidden sm:flex sm:ml-2">Join Party</div>
												</Button>
											)
										)
									) }
									
								</div>
							</div>
						</div>
					</div>
				) : (null) }
			</React.Fragment>
		);
	}
	
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updatePartyMember: Actions.updatePartyMember,
    }, dispatch);
}

function mapStateToProps(state) {
	return {
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Party);
