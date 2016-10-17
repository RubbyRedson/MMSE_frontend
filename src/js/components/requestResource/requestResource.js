import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getConflictingRequsts, getSubteamById, updateManagerSubteamRequests } from '../../api/subteamApi'
import { createProposal } from '../../api/resourceRequestApi'
import { getProjectById } from '../../api/projectApi'
import Ingress from '../lib/ingress'
import Project from '../lib/project'

class RequestResource extends Component {

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
		this.props.getRequests((err, items) => {
			console.log(items); 
		}); 
	}

	onSubmit(request){
		console.log(this.state.formdata); 

		var tmp = this.state.formdata[request.id]; 
		if(tmp){
			if(tmp.budgetProposal){
				var data = {
					project: request.project, 
					type: 'budget',
					proposal: tmp.budgetProposal
				};  

				this.props.createProposal(data, (err, _data) => {
				}); 
			}

			if(tmp.hireProposal){
				var data = {
					project: request.project, 
					type: 'people',
					proposal: tmp.hireProposal
				};  

				this.props.createProposal(data, (err, _data) => {
				}); 
			}

			this.props.updateToReviewed(request, () => {
				this.props.getRequests((err, items) => {
					console.log(items); 
				}); 
			}); 
		}
	}

	onChange(key, key2, value){
        var formdata = this.state.formdata; 
        if(!formdata[key]){
        	formdata[key] = {}; 
        }

        formdata[key][key2] = value; 
        this.setState({
          formdata: formdata
        }); 
    }

	getDetails(request){
		this.props.mergeProject(request, (err, _request) => {
			console.log(_request); 
			this.props.mergeSubteam(_request, () => {
				this.props.updateRequest(_request); 
			}); 
		}); 
	}

	getRequestLabels(request){
		let needPeople = (<div></div>); 
		let needBudget = (<div></div>); 
		let subteamName = request.reportedBySubteam; 

		if(request.subteamObject){
			subteamName = request.subteamObject.name
		}

		if(request.needMorePeople){
			needPeople = (
				<p style={styles.needLabel} >Subteam {subteamName} need more people </p>
			); 
		}

		if(request.needBiggerBudget){
			needBudget = (
				<p style={styles.needLabel} >Subteam {subteamName} need bigger budget </p>
			); 
		}

		return (
			<div>
				{needPeople}
				{needBudget}
			</div>
		); 
	}

	getRequestFields(request){
		let needPeople = (<div></div>); 
		let needBudget = (<div></div>); 

		if(request.needBiggerBudget){
			let val = this.state.formdata[request.id] ? this.state.formdata[request.id]['budgetProposal'] : ""; 
			needBudget = (
				<input style={styles.input}  type="number" value={val} placeholder="Budget proposal" onChange={(e) => {
					this.onChange(request.id, "budgetProposal", e.target.value)
				}}/>
			); 
		}

		if(request.needMorePeople){
			let val = this.state.formdata[request.id] ? this.state.formdata[request.id]['hireProposal'] : ""; 
			needPeople = (
				<input style={styles.input}  type="number" value={val} placeholder="Hire proposal" onChange={(e) => {
					this.onChange(request.id, "hireProposal", e.target.value)
				}}/>
			); 
		}

		return (
			<div>
				{needPeople}
				{needBudget}
			</div>
		); 
	}

	renderRequests() {


		return this.props.requests.map((request, i) => {

			let projectBody = (<div></div>); 

			if(request.projectObject){
				projectBody = (
					<Project project={request.projectObject} />
				); 
			}

			return (
				<div style={styles.clientBox} key={"clientBox" + request.id}>
					<p>Project id: {request.project} </p>
					{projectBody}
					{this.getRequestLabels(request)}
					
					<button style={styles.input} onClick={this.getDetails.bind(this, request)}>Get more details</button> <br />
					<div style={styles.proposal}>
						<h3>Make proposal</h3>
						{this.getRequestFields(request)}
						<button style={styles.input} onClick={this.onSubmit.bind(this, request)}>Request resource</button>
					</div>
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
					5.1 In case there are any scheduling conflicts or resource shortage, a Department manager can initiate a request to HR team for additional resources. HR team solves the issue through staff recruitment or outsourcing. If one of the subteams reported that they need a bigger budget the department manager can initiate a request for a higher budget with the financial manager. 
				</Ingress>
				{ bodySection }
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
    },
    needLabel: {
    	padding: 5, 
    	borderRadius: 20, 
    	backgroundColor: 'rgba(0, 0, 0, 0.2)', 
    	margin: 10, 
    },
    proposal: {
    	backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
		getRequests: (callback) => {
			getConflictingRequsts(dispatch, callback); 
		},
		mergeProject: (request, callback) => {
			getProjectById(request.project, dispatch, (err, project) => {
				request.projectObject = project;
				callback(err, request); 
			})
		},
		mergeSubteam: (request, callback) => {
			getSubteamById(request.reportedBySubteam, dispatch, (err, subteam) => {
				request.subteamObject = subteam; 
				callback(err, request);
			}); 
		},
		updateRequest: (request) => {
			dispatch({
				type: CONSTANTS.UPDATE_SUBTEAM_REQUEST,
				payload: request
			});
		},
		createProposal: (proposal, callback) => {
			createProposal(proposal, dispatch, callback); 
		},
		updateToReviewed: (request, callback) => {
			request.status = 2; 
			updateManagerSubteamRequests(request, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestResource); 