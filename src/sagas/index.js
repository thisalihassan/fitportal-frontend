import { all } from 'redux-saga/effects';
import authSaga from '../redux/auth/sagas'
export default function* rootSagas() {
	yield all([authSaga()]);
}
