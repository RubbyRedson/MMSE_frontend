import { combineReducers } from 'redux'
import appState from './reducers/appStateReducer'
import user from './reducers/userReducer'
import navigation from './reducers/navigationReducer'

export default combineReducers({
	appState,
	user,
	navigation
}); 