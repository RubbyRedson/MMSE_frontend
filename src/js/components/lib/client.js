import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function Client({client}){
	return (
		<div style={styles.project} >
			<h4>Client</h4>
			<p>Name: {client.name}</p>
			<p>Phone: {client.phone}</p>
			<p>Disount: {client.discount}</p>
		</div>
	); 
}

const styles = {
	project: {
    	backgroundColor: 'rgba(0, 0, 0, 0.2)',
    	marginLeft: 100,
    	marginRight: 100,
    	padding: 20,
    	marginBottom: 5
    },
}