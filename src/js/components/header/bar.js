import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'

class Bar extends Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
	}

	_getInitialState(){
		return {}; 
	}

	componentDidMount(){}

	logout(){
		this.props.logout(); 
	}

	render() {

		let label = (<p></p>); 

		if(this.props.user.isLoggedIn){
			label = (
				<p style={styles.right} onClick={this.logout.bind(this)}>
					Logout: {this.props.user.username} 
				</p>
			); 
		}else{
			label = (
				<p style={styles.right}>
					Login to continue
				</p>
			);
		}

		return (
			<div style={styles.container}>
				<h3 style={styles.text}>SEP - Swedish event planners</h3>
				{label}
			</div>
		); 
	}
}

const styles = {
	container: {
		padding: 20,
		backgroundColor: COLORS.BROWN
	},
	text:{
		color: COLORS.WHITE
	},
	right: {
		color: COLORS.WHITE,
		position: 'absolute',
		top: 10, 
		right: 10
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch({
				type: CONSTANTS.LOGOUT
			}); 
		} 
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar); 