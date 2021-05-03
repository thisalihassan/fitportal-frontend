import { combineReducers } from 'redux';
import Customizer from './customizer/reducer';
import authReducer from './auth/reducer'
const reducers = combineReducers({
	Customizer,
	authReducer,
});

export default reducers;
