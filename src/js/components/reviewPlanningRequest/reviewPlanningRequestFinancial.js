import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getPendingFinancialManagerRequests, submitFinancialManagerFeedback } from '../../api/planningRequestApi'
import Ingress from '../lib/ingress'

class ReviewPlanningRequestFinancial extends Component {

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

	submit(request){
		var payload = {
			feedback: this.state.formdata.feedback,
		}

		this.props.submit(request.id, payload, () => {
			this.props.getPlanningRequests(); 
		}); 
	}

    onChange(key, value){
        var formdata = this.state.formdata; 
        formdata[key] = value; 
        this.setState({
          formdata: formdata
        }); 
    }


	renderRequests(){
		return this.props.requests.map((request, i) => {
			return (
				<div style={styles.clientBox} key={"clientBox" + request.id}>
					<p>client_id: {request.client} </p>
					<p>{request.description}</p>
					<input style={styles.input}  type="text" value={this.state.formdata['feedback']} placeholder="feedback" onChange={(e) => {
						this.onChange("feedback", e.target.value)
					}}/>
					<button style={styles.input} onClick={this.submit.bind(this, request)}>Submit</button>
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
		submit: (id, payload, callback) => {
			submitFinancialManagerFeedback(id, payload, dispatch, callback); 
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPlanningRequestFinancial); 