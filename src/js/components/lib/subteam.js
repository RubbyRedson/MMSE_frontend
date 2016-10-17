import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function Subteam({subteam}){
	return (
		<div style={styles.project} >
			<h4>Subteam</h4>
			<p>Name: {subteam.name}</p>
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