import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getAllFinancialRequests, createJobAdvertisement, deleteResourceRequest, setResourceStatus } from '../../api/resourceRequestApi'
import { getSubteamById } from '../../api/subteamApi'
import { getProjectById } from '../../api/projectApi'
import { getClientById } from '../../api/clientApi'
import RequestPicker from '../jobAdvertisement/requestPicker'
import Ingress from '../lib/ingress'
import Project from '../lib/project'
import Subteam from '../lib/subteam'
import Client from '../lib/client'

class BudgetNegotiations extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {
			request: null,
			formdata: {}
		}; 
	}

	componentDidMount(){
		this.props.getRequests(); 
	}

    onChange(key, value){
        var formdata = this.state.formdata; 
        formdata[key] = value; 
        this.setState({
          formdata: formdata
        }); 
    }

    resetForm(){
    	this.setState(this._getInitialState()); 
    }

	onClick(){

		this.props.createAdvertisement(this.state.formdata, (err, response) => {
			if(err){
				console.warn(err); 
			}else{
				this.props.removeResourceRequests(this.state.request.id, () => {
					this.resetForm(); 
					this.props.getAllHrRequests(); 
				}); 
			}
		}); 
	}

	approve(request){
		this.props.approve(request, () => {
			this.resetForm(); 
			this.props.getRequests(); 
		}); 
	}

	reject(request){
		this.props.reject(request, () => {
			this.resetForm(); 
			this.props.getRequests(); 
		}); 
	}

	getForm(){

		let projectInfo = (<div></div>);
		let subteamInfo = (<div></div>); 
		let clientInfo = (<div></div>);

		if(this.state.request.projectObject){
			console.log(this.state.request.projectObject); 
			projectInfo = (
				<div>
					<Project project={this.state.request.projectObject}/>
				</div>
			); 
		}

		if(this.state.request.subteamObject){
			subteamInfo = (
				<div>
					<Subteam subteam={this.state.request.subteamObject}/>
				</div>
			); 
		}

		if(this.state.request.clientObject){
			clientInfo = (
				<div>
					<Client client={this.state.request.clientObject}/>
				</div>
			); 
		}

		return (
			<div>
				<h3>Working with request: {this.state.request.id}</h3>
				<Ingress>Proposed budget is {this.state.request.proposal}</Ingress>
				{projectInfo}
				{subteamInfo}
				{clientInfo}
				<button style={styles.input}  onClick={() => {this.resetForm()}} >Cancel</button>
				<button style={styles.input}  onClick={this.approve.bind(this, this.state.request)} >Approve</button>
				<button style={styles.input}  onClick={this.reject.bind(this, this.state.request)} >Reject</button>
			</div>
		); 
	}

	render() {
		let bodySection = (<div></div>); 
		if(!this.state.request){
			console.log(this.props.requests); 
			bodySection = (
				<RequestPicker requests={this.props.requests} onClick={(selected) => {
					this.props.mergeProject(selected, (_err, project) => {
						console.log(project); 
						selected.projectObject = project; 
						this.props.mergeSubteam(selected, (err, subteam) => {
							selected.subteamObject = subteam; 
							this.props.mergeClient(project.client, (__err, client) => {
								selected.clientObject = client

								this.setState({
									request: selected
								});
							}); 
						}); 
					}); 
					this.state.formdata['request'] = selected.id; 
					this.setState({
						request: selected,
						formdata: this.state.formdata
					});
				}}/>
			);
		}else{
			bodySection = this.getForm(); 
		}

		return (
			<div style={styles.container}>
				<Ingress>
					6.1 Department manager can request budget negotiation with the Financial manager based on the sub-team comments to event request. Financial manager negotiates the budget issues with the client and approves or declines the request.
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
}

const mapStateToProps = (state) => {
	return {
		user:state.user,
		requests: state.appState.financialRequests
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		approve: (request, callback) => {
			setResourceStatus(request.id, {project: request.project, approved:1}, dispatch, callback); 
		},
		reject: (request, callback) => {
			setResourceStatus(request.id, {project: request.project, approved:0}, dispatch, callback); 
		},
		getRequests: () => {
			getAllFinancialRequests(dispatch); 
		},
		mergeProject: (request, callback) => {
			getProjectById(request.project, dispatch, (err, project) => {
				callback(err, project); 
			})
		},
		mergeSubteam: (request, callback) => {
			getSubteamById(request.subteam, dispatch, (err, subteam) => { 
				callback(err, subteam);
			}); 
		},
		mergeClient: (clientId, callback) => {
			getClientById(clientId, dispatch, (err, client) => { 
				callback(err, client);
			}); 
		},
		createAdvertisement: (data, callback) => {
			createJobAdvertisement(data, dispatch, callback); 
		},
		removeResourceRequests: (id, callback) => {
			deleteResourceRequest(id, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetNegotiations); 