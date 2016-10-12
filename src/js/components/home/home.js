import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {getAllClients} from '../../api/clientApi'
import {CONSTANTS} from '../../core/constants'

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {};
    }

    componentDidMount() {
        this.props.getClients()
    }

    render() {
        console.log(this.props.clients);
        return (
            <div style={styles.container}>
                <p>Hello mr Gureev. Here's a dance for you: </p>
                <img src="img/spinner.gif"/>
                {this.props.clients}
            </div>
        );
    }
}

const styles = {
    container: {
        padding: 20,
        backgroundColor: COLORS.WHITE
    },
}

const mapStateToProps = (state) => {
    return {
        clients: state.appState.clients
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getClients: () => {
            getAllClients(dispatch);
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home); 