import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import { getAllClientsManager, updateClient, getClientProjectSum } from '../../api/clientApi'
import Ingress from '../lib/ingress'
import ClientPicker from '../createPlanningRequest/clientPicker'

class GiveClientDiscount extends Component {

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

	collectSum(){
		this.props.getProjectSum(this.state.client.id); 
	}

	getForm(){
		console.log(this.state.formdata); 

		let priceLabel = (<div></div>); 

		if(this.props.clientSum >= 0){
			priceLabel = (
				<div>
					<p>Sum of previous projects: {this.props.clientSum}</p>
				</div>
			); 
		}

		return (
			<div>
				<h3>Client: {this.state.client.name}</h3>
				<p> {this.state.msg} </p>
				{priceLabel}
				<button style={styles.input}  onClick={this.collectSum.bind(this)}>Collect sum of previous projects</button> <br />
				<input style={styles.input}  type="number" value={this.state.formdata['discount']} placeholder="discount" onChange={(e) => {
					this.onChange("discount", e.target.value)
				}}/>
				

				<button style={styles.input}  onClick={() => {
					this.setState({
						formdata: {},
						client: null
					});
				}}>Cancel</button>
				<button style={styles.input}  onClick={this.onSubmit.bind(this)}>Give discount</button>
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
					3.4 Customer service manager can give the frequent clients discounts. The discount is based on total cost of all the previous events for the customer.
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
		clients: state.appState.clients,
		clientSum: state.appState.clientSum
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllClients: () => {
			getAllClientsManager(dispatch); 
		},
		updateClient : (client, callback) => {
			updateClient(client, dispatch, callback); 
		},
		getProjectSum: (id) => {
			getClientProjectSum(id, dispatch); 
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GiveClientDiscount); 

