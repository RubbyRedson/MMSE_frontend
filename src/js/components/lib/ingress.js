import { COLORS } from '../../core/colors'
import { CONSTANTS } from '../../core/constants'
import  React, { Component } from 'react'

export default function Ingress({children}){
	return (
		<p style={styles.ingress}>
			{children}
		</p>
	); 
}

const styles = {
	ingress: {
		fontStyle: 'italic',
		padding: 20
	},
}