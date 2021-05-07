import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/sagas';
import customerSaga from '../redux/customers/sagas';
import trainingPlanSaga from '../redux/trainingPlans/sagas';
export default function* rootSagas() {
	yield all([authSaga(), customerSaga(), trainingPlanSaga()]);
}
