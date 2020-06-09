import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';

import Party from './Party';
import LoadingScreen from '../SharedComponent/LoadingScreen';

import '../../css/index.css';
const _ = require('lodash');

class Parties extends Component {

	state = {
		isLoadingData: true,
		partyList: null
	};

	componentDidMount() {
		this.props.getPartyList();
	}

	componentDidUpdate(prevProps, prevState) {
		
		if( !_.isEqual(this.state.partyList, this.props.partyList) ) {
			this.setState({ isLoadingData: false, partyList: [...this.props.partyList] });
		}
	}

	render() {

		const { partyList, isLoadingData } = this.state;

		return (
			<React.Fragment>
				<div className="flex justify-center">
					{ isLoadingData ? (
						<LoadingScreen />
					) : (
						<div className="max-w-screen-lg flex flex-1 px-2 py-8">
							{ partyList.length > 0 ? (
								<div className="flex flex-1 flex-wrap">
									{partyList.map( (party, i) => {
										return (
											<Party
												key={i}
												partyInfo={party}
											/>
										)
									} )}
								</div>
							) : (
								<div>Not found Party, let's <a className="main-link" href="/create" alt="Create Party">create it!</a></div>
							) }
						</div>
					) }
				</div>
			</React.Fragment>
		);
	}
	
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getPartyList: Actions.getPartyList,
    }, dispatch);
}

function mapStateToProps(state) {
	return {
		partyList: state.party.partyList
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Parties);
