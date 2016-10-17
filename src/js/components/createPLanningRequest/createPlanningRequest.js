import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getAllClients } from '../../api/clientApi'
import { createNewPlanningRequest } from '../../api/planningRequestApi'
import ClientPicker from './clientPicker'
import Ingress from '../lib/ingress'

class CreatePlanningRequest extends Component {

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
		this.props.createRequest(this.state.formdata, (err, response) => {
			if(err){
				console.warn(err); 
			}else{
				this.resetForm(); 
			}
		}); 
	}

	getForm(){
		console.log(this.state.client); 
		return (
			<div>
				<h3>Working with client: {this.state.client.name}</h3>
				<input style={styles.input}  type="number" value={this.state.formdata['proposed_budget']} placeholder="Proposed budget" onChange={(e) => {
					this.onChange("proposed_budget", e.target.value)
				}}/>
				<input style={styles.input}  type="text" value={this.state.formdata['description']} placeholder="description" onChange={(e) => {
					this.onChange("description", e.target.value)
				}}/>
				<button style={styles.input}  onClick={this.resetForm.bind(this)} >Cancel</button>
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
					2.1 Customer service team enter the client’s request in a form and send it to the Customer service manager. The manager should receive the request with the entered data.
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
			getAllClients(dispatch); 
		},
		createRequest: (data, callback) => {
			createNewPlanningRequest(data, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlanningRequest); 