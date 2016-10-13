import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {CONSTANTS} from '../../core/constants'
import {login} from '../../api/userApi'

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
      switch(this.props.index){
        case 0: 
          return (
            <div>Create application</div>
          ); 

        case 1: 
          return (
            <div>Some other component</div>
          );

        case 2: 
          return (
            <div>Some other component 2</div>
          );

        case 3: 
          return (
            <div>I dunno</div>
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
        padding: 20,
        backgroundColor: COLORS.WHITE,
        textAlign: 'center',
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