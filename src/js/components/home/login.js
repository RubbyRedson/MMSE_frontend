import  React, {Component} from 'react'
import {connect} from 'react-redux'
import {COLORS} from '../../core/colors'
import {CONSTANTS} from '../../core/constants'
import {login} from '../../api/userApi'

class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
          formdata: {},
          err: null
        };
    }

    componentDidMount() {}

    onChange(key, value){
        console.log(value); 
        var formdata = this.state.formdata; 
        formdata[key] = value; 
        this.setState({
          formdata: formdata
        }); 
    }

    onClick(){
        this.props.loginUser(this.state.formdata, (err) => {
            this.setState({
              err: err
            }); 
        }); 
    }

    render() {
     		return (
     			  <div style={styles.container} >
              <h3>Login to continue</h3>
              <p style={styles.error}>{this.state.err}</p>
              <input style={styles.input} value={this.state.formdata['username']} type="text" placeholder="username@provider.com" onChange={(e) => {
                this.onChange('username', e.target.value); 
              }}/>
              <br /> 
              <input style={styles.input} value={this.state.formdata['password']} type="password" placeholder="my pasword" onChange={(e) => {
                 this.onChange('password', e.target.value); 
              }} />
              <br />
              <button style={styles.input} onClick={this.onClick.bind(this)}>Login</button>
            </div>
     		); 
    }
}

const styles = {
    container: {
        padding: 20,
        backgroundColor: COLORS.WHITE,
        textAlign: 'center'
    },
    input: {
      padding: 20, 
      margin: 10
    },
    error: {
      color: COLORS.ERROR
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
      loginUser: (user, callback) => {
        login(user, dispatch, callback); 
      }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login); 