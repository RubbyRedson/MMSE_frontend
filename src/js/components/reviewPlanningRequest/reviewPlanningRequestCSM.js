import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getFinishedCSMRequests } from '../../api/planningRequestApi'
import { getClientById } from '../../api/clientApi'
import Ingress from '../lib/ingress'

class ReviewPlanningRequestCSM extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {
			formdata: {}
		}; 
	}

	componentDidMount(){
		this.props.getPlanningRequests(); 
	}

	getClient(clientId){
		this.props.getClientById(clientId); 
	}

	renderRequests(){
		console.log(this.props.clientTree); 

		return this.props.requests.map((request, i) => {

			let clientInfo = (<p></p>); 

			if(this.props.clientTree[request.client]){
				let client = this.props.clientTree[request.client]; 
				clientInfo = (
					<div>
						<p>Name: {client.name}</p>
						<p>Phone: {client.phone}</p>
						<p>Discount: {client.discount}</p>
					</div>
				); 
			}

			let approveLabel = (
				<p>Status: {request.status == 4 ? "Approved" : "Denied"}</p>
			); 
			return (
				<div style={styles.clientBox} key={"clientBox" + request.id}>
					<p>client_id: {request.client} </p>
					<p>{request.description}</p>
					<p>Financial manager feedback: {request.feedback}</p>
					{ approveLabel }
					{ clientInfo }
					<button style={styles.input} onClick={this.getClient.bind(this, request.client)}>Get client details</button>
				</div>
			);
		}); 
	}

	render() {

		let bodySection = (<p>Waiting to collect requests...</p>); 

		if(this.props.requests){
			bodySection = this.renderRequests(); 
		}

		return (
			<div>
				<Ingress>
					2.5 Customer service manager contacts the client and in case of approval, she organizes a meeting with the client to discuss their preferences and planned budget, based on the decision from administration department manager.
				</Ingress>
				{bodySection}
			</div>
		); 
	}
}
	
const styles = {
	container: {
		padding: 20,
	},
	text: {
	},
	ingress: {
		fontStyle: 'italic'
	},
	input: {
      padding: 20, 
      margin: 10
    },
    clientBox: {
    	margin: 3, 
    	padding: 10,
    	backgroundColor: COLORS.GRAY
    }
}

const mapStateToProps = (state) => {
	return {
		user:state.user,
		requests: state.appState.cmsRequests,
		clientTree: state.appState.clientTree
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPlanningRequests: () => {
			getFinishedCSMRequests(dispatch); 
		},
		getClientById: (id) => {
			getClientById(id, dispatch); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPlanningRequestCSM); 