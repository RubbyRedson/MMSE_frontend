import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getAllClientsManager, updateClient } from '../../api/clientApi'
import Ingress from '../lib/ingress'
import ClientPicker from '../createPlanningRequest/clientPicker'

class EditClient extends Component {

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

	onSubmit(){
		console.log(this.state.formdata); 
		this.props.updateClient(this.state.formdata, () => {
			this.props.getAllClients();

			this.setState({
				formdata: {},
				client: null
			});
		}); 
	}

	onChange(key, value){
        var formdata = this.state.formdata; 
        formdata[key] = value; 
        this.setState({
          formdata: formdata
        }); 
    }


	getForm(){
		console.log(this.state.formdata); 
		return (
			<div>
				<h3>New client</h3>
				<p> {this.state.msg} </p>
				<input style={styles.input}  type="text" value={this.state.formdata['name']} placeholder="name" onChange={(e) => {
					this.onChange("name", e.target.value)
				}}/>
				<input style={styles.input}  type="text" value={this.state.formdata['phone']} placeholder="phone" onChange={(e) => {
					this.onChange("phone", e.target.value)
				}}/>
				<input style={styles.input}  type="number" value={this.state.formdata['discount']} placeholder="discount" onChange={(e) => {
					this.onChange("discount", e.target.value)
				}}/>
				<button style={styles.input}  onClick={() => {
					this.setState({
						formdata: {},
						client: null
					});
				}}>Cancel</button>
				<button style={styles.input}  onClick={this.onSubmit.bind(this)}>Submit</button>
			</div>
		); 
	}

	render() {

		let bodySection = (<div></div>); 
		if(!this.state.client){
			bodySection = (
				<ClientPicker clients={this.props.clients} onClick={(selected) => {
					console.log("Click"); 
					this.state.formdata['id'] = selected.id; 
					this.state.formdata['name'] = selected.name; 
					this.state.formdata['phone'] = selected.phone; 
					this.state.formdata['discount'] = selected.discount; 


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
			<div>
				<Ingress>
					3.2 Customer service manager can view and modify the records on existing clients.
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
		clients: state.appState.clients
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllClients: () => {
			getAllClientsManager(dispatch); 
		},
		updateClient : (client, callback) => {
			updateClient(client, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClient); 

