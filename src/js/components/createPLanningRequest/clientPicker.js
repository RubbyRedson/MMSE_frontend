import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function ClientPicker({clients, onClick}){

	var components = (<div></div>); 
	if(!!clients){
		components =  clients.map(function(client){
			return (
				<div key={"client" + client.id} onClick={() => { 
					onClick(client);  
				}}>
					<p>{client.name}</p>
				</div>
			); 
		}); 
	}

	return (
		<div style={styles.container}>
			<h3>Pick a customer</h3>
			{components} 
		</div>
	); 
}

const styles = {
	container: {
		padding: 20,
		backgroundColor: COLORS.GRAY
	}
}