import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/sagas'
import customerSaga from '../redux/customers/sagas'
export default function* rootSagas() {
	yield all([authSaga(), customerSaga()]);
}
