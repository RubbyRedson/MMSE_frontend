import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getAllClientsManager } from '../../api/clientApi'
import { createProject } from '../../api/projectApi'
import ClientPicker from '../createPlanningRequest/clientPicker'
import Ingress from '../lib/ingress'

class CreateSubteamRequest extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {
			client: null,
			formdata: {}
		}; 
	}

	componentDidMount(){
		this.props.getAllClients(); 
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
		console.log("Submitting"); 
		this.props.createTheProject(this.state.formdata, (err, response) => {
			if(err){
				console.warn(err); 
			}else{
				this.resetForm(); 
			}
		}); 
	}

	getForm(){
		return (
			<div>
				<h3>Working with client: {this.state.client.name}</h3>
				<input style={styles.input}  type="text" value={this.state.formdata['name']} placeholder="Name" onChange={(e) => {
					this.onChange("name", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="text" value={this.state.formdata['description']} placeholder="Description" onChange={(e) => {
					this.onChange("description", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="number" value={this.state.formdata['cose']} placeholder="Cost" onChange={(e) => {
					this.onChange("cost", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="date" value={this.state.formdata['start']} placeholder="Start" onChange={(e) => {
					this.onChange("start", e.target.value)
				}}/> <br />
				<input style={styles.input}  type="date" value={this.state.formdata['stop']} placeholder="Stop" onChange={(e) => {
					this.onChange("stop", e.target.value)
				}}/> <br />
				<button style={styles.input}  onClick={this.onClick.bind(this)} >Submit</button>
			</div>
		); 
	}

	render() {

		let bodySection = (<div></div>); 
		if(!this.state.client){
			bodySection = (
				<ClientPicker clients={this.props.clients} onClick={(selected) => {
					this.state.formdata['client'] = selected.id; 
					this.setState({
						client: selected,
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
					4.1 Department manager fills an application with the client needs from his department and sends tasks to each sub-team. 
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
		clients: state.appState.clients
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllClients: () => {
			getAllClientsManager(dispatch); 
		},
		createTheProject: (data, callback) => {
			createProject(data, dispatch, callback); 
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubteamRequest); 