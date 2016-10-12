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

	render() {
		return (
			<div style={styles.container}>
				<p style={styles.text}>The footer</p>
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
	}
}

const mapStateToProps = (state) => {
	return {};
}

const mapDispatchToProps = (dispatch) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Bar); 