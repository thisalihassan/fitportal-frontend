import { combineReducers } from 'redux';
import Customizer from './customizer/reducer';
import authReducer from './auth/reducer';
import customerReducer from './customers/reducer';
import invoice from './invoice/reducer';
const reducers = combineReducers({
	Customizer,
	authReducer,
	customerReducer,
	invoice
});

export default reducers;
