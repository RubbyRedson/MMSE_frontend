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
            <DashboardItem name="2.1 Create planning request (Customer service team)" index={0} role_tag={"customer_service"} />
            <DashboardItem name="2.2 Review planning requests (Customer service manager)" index={1} role_tag={"customer_service_manager"}/>
            <DashboardItem name="2.3 Review client request (Financial manager)" index={2} role_tag={"financial_manager"}/>
            <DashboardItem name="2.4 Review client request (Administration department)" index={3} role_tag={"administration_department"}/>
            <DashboardItem name="2.5 Review client request (Customer service manager)" index={4} role_tag={"customer_service_manager"}/>
            <DashboardItem name="3.1 Create new client (Customer service manager)" index={5} role_tag={"customer_service_manager"}/>
            <DashboardItem name="3.2 Modify client (Customer service manager)" index={6} role_tag={"customer_service_manager"}/>
            <DashboardItem name="3.4 Give client discount (Customer service manager)" index={7} role_tag={"customer_service_manager"}/>
            <DashboardItem name="4.1 Send request to subteam (Department manager)" index={9} role_tag={"production_manager"}/>
            <DashboardItem name="4.2 Fill expected plan(Subteam)" index={10} role_tag={"sub_team"} />
            <DashboardItem name="5.1 Request aditional resource (Department manager)" index={11} role_tag={"production_manager"}/>
            <DashboardItem name="5.2 Create job advertisement (HR team)" index={12} role_tag={"hr_team"}/>
            <DashboardItem name="6.1 Request budget negotiation (Deparment manager)" index={13} role_tag={"production_manager"}/>
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