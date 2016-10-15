import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {getAllClients} from '../../api/clientApi'
import {CONSTANTS} from '../../core/constants'
import Login from './login'
import DashboardItem from './dashboardItem'

class Dashboard extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    renderRows(){
      return (
          <div>
            <DashboardItem name="Create planning request (Customer service team)" index={0}/>
            <DashboardItem name="Review planning requests (Customer service manager)" index={1}/>
            <DashboardItem name="Review client request (Financial manager)" index={2}/>
            <DashboardItem name="Review client request (Administration department)" index={3}/>
            <DashboardItem name="Review client request (Customer service manager)" index={4}/>
            <DashboardItem name="Create new client (Customer service manager)" index={5}/>
            <DashboardItem name="Modify client (Customer service manager)" index={6}/>
            <DashboardItem name="Give client discount (Customer service manager)" index={7}/>
            <DashboardItem name="Give client discount (Customer service manager)" index={8}/>
            <DashboardItem name="Send request to subteam (Department manager manager)" index={9}/>
            <DashboardItem name="Fill expected plan(Subteam)" index={10}/>
            <DashboardItem name="Request aditional resource (Department manager)" index={11}/>
            <DashboardItem name="Create job advertisement (HR team)" index={12}/>
            <DashboardItem name="Request budget negotiation (Deparment manager)" index={13}/>
          </div>
      ); 
    }

    render() {
       	return (
          <div style={styles.container}>
            the dashboard
            {this.renderRows()}
          </div>
        ); 
    }
}

const styles = {
    container: {
        padding: 20,
        margin: 0,
        backgroundColor: COLORS.LIGHT_BLUE,
        width: 200,
        float: 'left'
    },
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard); 