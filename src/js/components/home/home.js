import  React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'

class Home extends Component {

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
				<p>Hello mr Gureev. Here's a dance for you: </p>
				<img src="img/spinner.gif" />
			</div>
		); 
	}
}

const styles = {
	container: {
		padding: 20,
		backgroundColor: COLORS.WHITE
	},
}

const mapStateToProps = (state) => {
	return {};
}

const mapDispatchToProps = (dispatch) => {
	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home); 