import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getHrRequests, createJobAdvertisement, deleteResourceRequest } from '../../api/resourceRequestApi'
import { getSubteamById } from '../../api/subteamApi'
import { getProjectById } from '../../api/projectApi'
import RequestPicker from './requestPicker'
import Ingress from '../lib/ingress'
import Project from '../lib/project'
import Subteam from '../lib/subteam'

class CreateJobAdvertisement extends Component {

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
		this.props.getAllHrRequests(); 
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

	getForm(){

		let projectInfo = (<div></div>);
		let subteamInfo = (<div></div>); 

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

		return (
			<div>
				<h3>Working with request: {this.state.request.id}</h3>
				<Ingress>Proposed number of people is {this.state.request.proposal}</Ingress>
				{projectInfo}
				{subteamInfo}
				<input style={styles.input}  type="text" value={this.state.formdata['title']} placeholder="Title" onChange={(e) => {
					this.onChange("title", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="text" value={this.state.formdata['description']} placeholder="Job description" onChange={(e) => {
					this.onChange("description", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="number" value={this.state.formdata['salary']} placeholder="Salary" onChange={(e) => {
					this.onChange("salary", e.target.value)
				}}/> <br />

				<input style={styles.input}  type="number" value={this.state.formdata['count']} placeholder="Number of people" onChange={(e) => {
					this.onChange("count", e.target.value)
				}}/> <br />

				<button style={styles.input}  onClick={() => {this.resetForm()}} >Cancel</button>
				<button style={styles.input}  onClick={this.onClick.bind(this)} >Submit</button>
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
							this.setState({
								request: selected
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
					5.2 HR team can prepare and post job advertisements for open positions.
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
		requests: state.appState.hrRequests
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllHrRequests: () => {
			getHrRequests(dispatch); 
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
		createAdvertisement: (data, callback) => {
			createJobAdvertisement(data, dispatch, callback); 
		},
		removeResourceRequests: (id, callback) => {
			deleteResourceRequest(id, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateJobAdvertisement); 