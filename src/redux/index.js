import { combineReducers } from 'redux';
import Customizer from './customizer/reducer';
import authReducer from './auth/reducer'
import customerReducer from './customers/reducer'
const reducers = combineReducers({
	Customizer,
	authReducer,
	customerReducer
});

export default reducers;
