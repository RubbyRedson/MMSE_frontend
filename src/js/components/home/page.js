import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {CONSTANTS} from '../../core/constants'
import {login} from '../../api/userApi'
import CreatePlanningRequest from '../createPlanningRequest/createPlanningRequest'
import ReviewPlanningRequest from '../reviewPlanningRequest/reviewPlanningRequest'
import ReviewPlanningRequestFinancial from '../reviewPlanningRequest/reviewPlanningRequestFinancial'
import ReviewPlanningRequestAdmin from '../reviewPlanningRequest/reviewPlanningRequestAdmin'
import ReviewPlanningRequestCMS from '../reviewPlanningRequest/reviewPlanningRequestCSM'
import CreateNewClient from '../createNewClient/createNewClient'
import EditClient from '../editClient/editClient'
import GiveClientDiscount from '../editClient/giveClientDiscount'
import CreateSubteamRequest from '../createSubteamRequest/createSubteamRequest'
import FillExpectedPlan from '../subteam/fillExpectedPlan'
import RequestResource from '../requestResource/requestResource'
import CreateJobAdvertisement from '../jobAdvertisement/createJobAdvertisement'

class Page extends Component {
  
    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {}

    renderPage(){
      console.log(this.props.index); 
      switch(this.props.index){
        case -1: 
          return (
            <div>
              <h3>Welcome</h3>
              <p>Select event from the dashboard</p>
            </div>
          );

        case 0: 
          return (
            <CreatePlanningRequest />
          ); 

        case 1: 
          return (
            <ReviewPlanningRequest />
          );

        case 2: 
          return (
            <ReviewPlanningRequestFinancial />
          );

        case 3: 
          return (
            <ReviewPlanningRequestAdmin />
          );

        case 4: 
          return (
            <ReviewPlanningRequestCMS />
          );

        case 5: 
          return (
            <CreateNewClient />
          );

        case 6: 
          return (
            <EditClient />
          );

        case 7: 
          return (
            <GiveClientDiscount />
          );

        case 8:
          return (
            <CreateSubteamRequest />
          );

        case 9:
          return (
            <FillExpectedPlan />
          );

        case 10:
          return (
            <RequestResource />
          );

        case 11:
          return (
            <CreateJobAdvertisement />
          );          
      }
    }

    render() {
     		return (
     			  <div style={styles.container} >
              {this.renderPage()}
            </div>
     		); 
    }
}

const styles = {
    container: {
        backgroundColor: COLORS.WHITE,
        textAlign: 'center',
        float: 'left',
        width: '75%',
    },
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        index: state.appState.selectedDashbordItem
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Page); 