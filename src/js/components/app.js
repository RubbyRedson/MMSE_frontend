import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import MyApp from '../core/reducers'
import Bar from './header/bar'
import Footer from './footer/footer'
import { getRoute } from './router'

const store = createStore(MyApp); 

export default class App extends React.Component {

	constructor(props, context){
		super(props, context); 
		this.state = this._getInitialState(); 
		this.unsubscribe = store.subscribe(() => {
			this.forceUpdate();			
		});
	}

	_getInitialState(){
		return {}; 
	}

	componentWillUnmount(){
		if(this.unsubscribe){
			this.unsubscribe(); 
			this.unsubscribe = null; 
		}
	}

	componentDidMount(){
		registerListeners(store.dispatch); 
	}

	render() {

		let footer = (<div></div>); 

		//if(store.getState().user.isLoggedIn){
		if(true){
			footer = (<Footer />);
		}

		return (
			<div style={styles.container}>
				<Provider store={store}>
					<div>
						<Bar />
						{getRoute(store.getState().navigation.route)}
						{footer}
					</div>
			  	</Provider>
			</div>
		)
	}
}

const styles = {
	container:{
		padding: 0, 
		margin: 0
	}
}