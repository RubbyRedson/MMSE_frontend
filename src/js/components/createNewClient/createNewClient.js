import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { createNewClient } from '../../api/clientApi'
import Ingress from '../lib/ingress'

class CreateNewClient extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {
			formdata: {},
			msg: ""
		}; 
	}

	componentDidMount(){}

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
		this.props.createClient(this.state.formdata, (err, response) => {
			if(err){
				console.warn(err); 
			}else{
				this.resetForm(); 
				this.setState({
					msg: "Customer was created"
				}); 
			}
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
				<button style={styles.input}  onClick={this.onClick.bind(this)}>Submit</button>
			</div>
		); 
	}

	render() {
		return (
			<div style={styles.container}>
				<Ingress>
					3.1 Customer service manager can create a new client, when a new request from a new client is received.
				</Ingress>
				{this.getForm()}
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
		createClient: (data, callback) => {
			createNewClient(data, dispatch, callback); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewClient); 