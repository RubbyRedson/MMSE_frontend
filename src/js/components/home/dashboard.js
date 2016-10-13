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
            <DashboardItem name="Create application" index={0}/>
            <DashboardItem name="Some other event" index={1}/>
            <DashboardItem name="Yet another event" index={2}/>
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