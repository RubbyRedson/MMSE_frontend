import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function RequestPicker({requests, onClick}){

	var components = (<div></div>); 
	if(!!requests){
		components =  requests.map(function(request){
			return (
				<div style={styles.container} key={"client" + request.id} onClick={() => { 
					onClick(request);  
				}}>
					<p>Request id: {request.id}, Requested proposal: {request.proposal}, Needed for project: {request.project}</p>
				</div>
			); 
		}); 
	}

	return (
		<div style={styles.container}>
			<h3>Pick a request</h3>
			{components} 
		</div>
	); 
}

const styles = {
	container: {
		padding: 20,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		margin: 2
	}
}