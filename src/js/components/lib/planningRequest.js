import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function PlanningRequest({request}){

	return (
		<div style={styles.project} >
			<h4>Planning request</h4>
			<p>{request.description}</p>
			<p>Proposed budget: {request.proposed_budget}</p>
			<p>{request.feedback.length > 0 ? "Financial manager feedback: " + request.feedback : ""}</p>
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