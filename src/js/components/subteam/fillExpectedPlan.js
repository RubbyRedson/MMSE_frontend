import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getProjectById } from '../../api/projectApi'
import { getSubteamRequests, updateSubteamRequests } from '../../api/subteamApi'
import Ingress from '../lib/ingress'

class FillExpectedPlan extends Component {

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
		this.props.getSubteamRequests(); 
	}

    onChange(request){
        this.props.updateRequest(request); 
    }

    onSubmit(request){
    	this.props.submitChanges(request, () => {
    		this.props.getSubteamRequests(); 
    	}); 
    }

    onGetProject(request){
    	this.props.mergeProject(request);
    }

	renderRequests(){
		return this.props.requests.map((request, i) => {

			let projectBody = (<div></div>); 

			if(request.projectObject){
				projectBody = (
					<div style={styles.project} >
						<p>Name: {request.projectObject.name}</p>
						<p>Description: {request.projectObject.description}</p>
						<p>Cost. {request.projectObject.cost}</p>
						<p>Start: {request.projectObject.start}</p>
						<p>Stop: {request.projectObject.stop}</p>
					</div>
				); 
			}

			return (
				<div style={styles.clientBox} key={"clientBox" + request.id}>
					<p>Request id: {request.id} </p>
					<p>For subteam: {request.reportedBySubteam}</p>
					{ projectBody }
					<button style={styles.input}  onClick={this.onGetProject.bind(this, request)} >See project</button> <br />
					<input style={styles.input}  type="checkbox" checked={request.needBiggerBudget} onChange={(e) => {
						request.needBiggerBudget = e.target.checked ? 1 : 0; 
						console.log(e.target.checked); 
						this.onChange(request); 
					}}/> Need bigger budget <br />
					<input style={styles.input}  type="checkbox" checked={request.needMorePeople} onChange={(e) => {
						console.log(e.target.checked); 
						request.needMorePeople = e.target.checked ? 1 : 0; 
						this.onChange(request);
					}}/> Need more people <br />
					<button style={styles.input}  onClick={this.onSubmit.bind(this, request)} >Submit</button>
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
					4.2 Each sub-team edits the task by filling an expected plan and adding comments for extra budget if needed.
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
    },
    project: {
    	backgroundColor: 'rgba(0, 0, 0, 0.2)',
    	marginLeft: 100,
    	marginRight: 100,
    	padding: 20
    }
}

const mapStateToProps = (state) => {
	return {
		user:state.user,
		requests: state.appState.subteamRequests
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getSubteamRequests: () => {
			getSubteamRequests(dispatch); 
		},
		updateRequest: (request) => {
			dispatch({
				type: CONSTANTS.UPDATE_SUBTEAM_REQUEST,
				payload: request
			});
		},
		submitChanges: (data, callback) => {
			data.status = 2; 
			updateSubteamRequests(data, dispatch, callback); 
		},
		mergeProject: (request) => {
			getProjectById(request.project, dispatch, (err, project) => {
				request.projectObject = project; 

				dispatch({
					type: CONSTANTS.UPDATE_SUBTEAM_REQUEST,
					payload: request
				});
			})
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FillExpectedPlan); 