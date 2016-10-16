import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getPendingFinancialManagerRequests, setRequestToFinancialApproved, setRequestToFinancialRejected } from '../../api/planningRequestApi'
import Ingress from '../lib/ingress'

class ReviewPlanningRequestFinancial extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {}; 
	}

	componentDidMount(){
		this.props.getPlanningRequests(); 
	}

	approve(request){
		console.log("Arroving: ", request); 
		this.props.approve(request.id, () => {
			this.props.getPlanningRequests(); 
		}); 
	}

	reject(request){
		console.log("Rejecting: ", request); 
		this.props.reject(request.id, () => {
			this.props.getPlanningRequests(); 
		}); 
	}

	renderRequests(){
		return this.props.requests.map((request, i) => {
			return (
				<div style={styles.clientBox} key={"clientBox" + request.id}>
					<p>client_id: {request.client} </p>
					<p>{request.description}</p>
					<button style={styles.input} onClick={this.approve.bind(this, request)}>Approve</button>
					<button style={styles.input} onClick={this.reject.bind(this, request)}>Reject</button>
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
					2.3 Financial manager receives client’s request for an event from Customer service manager. Financial manager writes his feedback based on the estimated budget by the client. The financial manager redirects it to the administration department manager
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
		requests: state.appState.financialManagerRequests
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPlanningRequests: () => {
			getPendingFinancialManagerRequests(dispatch); 
		},
		approve: (id, callback) => {
			setRequestToFinancialApproved(id, dispatch, callback); 
		},
		reject: (id, callback) => {
			setRequestToFinancialRejected(id, dispatch, callback);
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPlanningRequestFinancial); 