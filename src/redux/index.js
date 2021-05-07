import { combineReducers } from 'redux';
import Customizer from './customizer/reducer';
import authReducer from './auth/reducer';
import customerReducer from './customers/reducer';
import plans from './trainingPlans/reducer';
const reducers = combineReducers({
	plans,
	Customizer,
	authReducer,
	customerReducer
});

export default reducers;
