import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../store/actions';
import ApiProxy from '../../utils/ApiProxy';
import {
	Button,
	TextField,
	CircularProgress
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import '../../css/index.css';
const _ = require('lodash');

class PartyForm extends Component {

	state = {
		userInfo: {},
		partyInfo: {
			partyImage: '',
			partyName: '',
			maxMember: 0
		},
		isUploading: false
	};

	componentDidMount() {

	}

	componentDidUpdate(prevProps, prevState) {
		if( !_.isEqual(this.state.userInfo, this.props.userInfo) ) {
			this.setState({ userInfo: this.props.userInfo });
		}

		if( !_.isEqual(this.props.partyList, prevProps.partyList) ) {
			window.location.href = '/';
		}
	}

	uploadImage = (event) => {
		const files = Array.from(event.target.files);
		const formData = new FormData();

		files.forEach((file, i) => {
			formData.append(i, file)
		});

		const apiProxy = new ApiProxy();
		let request = apiProxy.sendRequest('POST', '/file/upload', formData);
		request.then(response => { 
			let partyInfo = this.state.partyInfo;
			partyInfo.partyImage = response.data[0];
			this.setState({ isUploading: false, partyInfo: {...partyInfo}  });
		});

	}

	handleInputChange = (event) => {
        if (event.target.name === "eventInfo.name") {
            if (new Blob([event.target.value]).size > 255) {
                return;
            }
        }
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
	};
	
	savePartyInfo = (event) => {
		event.preventDefault();

		this.props.createParty(this.state.partyInfo, this.state.userInfo.userID);
	};


	render() {
		const { isUploading, partyInfo } = this.state;

		return (
			<React.Fragment>
				<div className="flex justify-center">
					<div className="max-w-screen-lg flex flex-1 flex-col px-2 py-8">
						<div className="flex flex-col mx-auto w-full sm:w-3/5 md:w-3/5 rounded shadow-lg bg-white px-8 py-6">
							<div className="mb-4 text-2xl font-semibold">ข้อมูลปาร์ตี้</div>
							<div className="mb-4">
								{ isUploading ? (
									<CircularProgress size="2rem" />
								) : (
									<label htmlFor="partyImage" className="cursor-pointer">
										{ partyInfo.partyImage.length > 0 ? (
											<img className="" alt="Party" component="span" src={partyInfo.partyImage} />
										) : (
											<Button
												component="span"
												variant="contained"
												color="default"
												startIcon={<CloudUploadIcon />}
											>
												Upload Image
											</Button>
										) }
									</label>
								) }

								<input
									accept="image/*"
									className="hidden"
									id="partyImage"
									type="file"
									onChange={this.uploadImage}
								/>
							</div>
							<div className="mb-4">
								<TextField
									id="party-name"
									label="ชื่อปาร์ตี้"
									type="text"
									className="w-full shadow"
									variant="outlined"
									name="partyInfo.partyName" 
									value={partyInfo.partyName}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="mb-8">
								<TextField
									id="max-member"
									label="จำนวนคนที่ขาด"
									type="number"
									className="shadow"
									variant="outlined"
									name="partyInfo.maxMember" 
									value={partyInfo.maxMember}
									onChange={this.handleInputChange}
								/>
							</div>
							<div className="flex items-center justify-center">
								<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" type="button" onClick={this.savePartyInfo}>
									สร้าง Party
								</button>
								<a className="inline-block align-baseline font-medium text-sm" href="/">
									ยกเลิก
								</a>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
	
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createParty: Actions.createParty,
    }, dispatch);
}

function mapStateToProps(state) {
	return {
		partyList: state.party.partyList,
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (PartyForm);
