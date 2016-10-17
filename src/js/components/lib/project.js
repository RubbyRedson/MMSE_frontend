import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function Project({project}){
	return (
		<div style={styles.project} >
			<h4>Project</h4>
			<p>Name: {project.name}</p>
			<p>Description: {project.description}</p>
			<p>Cost. {project.cost}</p>
			<p>Start: {project.start}</p>
			<p>Stop: {project.stop}</p>
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