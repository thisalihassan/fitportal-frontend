import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';

const loginDetailsFetch = async (payload) =>
	await fetch(`${API_URL}/auth`, {
		method: 'POST',
		body: JSON.stringify(payload),
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const userDetailsFetch = async () =>
	await fetch(`${API_URL}/auth`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

export function* loginDetails() {
	yield takeEvery(actions.LOGIN, function* (data) {
		const { payload } = data;
		if (payload) {
			const { status, info } = yield call(loginDetailsFetch, payload);
			console.log(info);
			localStorage.setItem('id_token', info);
			if (status >= 400) {
				console.log(status);
			} else {
				yield put({
					type: actions.LOGIN_FETCH,
					payload: info
				});
			}
		}
	});
}

export function* userDetails() {
	yield takeEvery(actions.LOGIN_FETCH, function* () {
		headers.access_token = localStorage.getItem('id_token');
		const response = yield call(userDetailsFetch);
		if (response === null) {
		} else {
			yield put({
				type: actions.LOGIN_SUCCESS,
				payload: response
			});
		}
	});
}

export default function* rootSaga() {
	yield all([fork(userDetails), fork(loginDetails)]);
}
