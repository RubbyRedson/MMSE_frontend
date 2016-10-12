import  React, { Component } from 'react'
import { CONSTANTS } from '../../core/constants'
import { COLORS } from '../../core/colors'
import { connect } from 'react-redux'

const Spinner = ({visible}) => {
	if(visible){
		return (
			<div>
				<img src={CONSTANTS.LOCAL_FILE_SERVER + "spinner.gif"} />
			</div>
		); 
	}else{
		return (
			<div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);