import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {getAllClients} from '../../api/clientApi'
import {CONSTANTS} from '../../core/constants'
import {getData} from '../../core/persistentStorage'
import Login from './login'
import Dashboard from './dashboard'
import Page from './page'

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {
       if(!this.props.user.isLoggedIn){
       		var user = JSON.parse(getData("user")); 
       		if(user){
       			this.props.setUser(user); 
       		}
       }
    }


    render() {
       	if(this.props.user.isLoggedIn){
	        return (
	            <div style={styles.container}>
	                <Dashboard />
	                <Page />
	            </div>
	        );
       	}else{
       		return (
       			<Login />
       		); 
       	}
    }
}

const styles = {
    container: {
        backgroundColor: COLORS.WHITE
    },
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    	setUser : (user) => {
    		dispatch({
                type: CONSTANTS.GOT_USER_LOGIN,
                payload: user
            });
    	}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home); 