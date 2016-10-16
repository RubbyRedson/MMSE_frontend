import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {getAllClients} from '../../api/clientApi'
import {CONSTANTS} from '../../core/constants'
import {getData} from '../../core/persistentStorage'
import Login from './login'
import Dashboard from './dashboard'

class DashboardItem extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {

    }

    userIsAllowedToIndex(index, userRole){
      return this.props.role_tag == userRole.tag; 
    }

    onClick(){
      if(this.userIsAllowedToIndex(this.props.index, this.props.user.role)){   
          this.props.selectIndex(this.props.index); 
      }else{
        alert("You are not allowed to do this"); 
      }
    }

    render() {
        let myStyle = styles.row; 
        if(this.props.selected == this.props.index){
          myStyle = styles.selected; 
        }

       	return (
          <div style={myStyle} onClick={this.onClick.bind(this)}>
              {this.props.name}
          </div>
        ); 
    }
}

const styles = {
    container: {
        backgroundColor: COLORS.WHITE
    },
    row: {
      margin: 10,
      padding: 10,  
      backgroundColor: COLORS.GRAY,
      borderRadius: 2
    },
    selected: {
      padding: 10, 
      margin: 2, 
      backgroundColor: COLORS.WHITE,
      borderRadius: 2
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selected: state.appState.selectedDashbordItem
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    	setUser : (user) => {
    		dispatch({
            type: CONSTANTS.GOT_USER_LOGIN,
            payload: user
        });
    	},
      selectIndex: (index) => {
        dispatch({
            type: CONSTANTS.SELECT_DASHBOARD_INDEX,
            payload: index
        });
      }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardItem); 