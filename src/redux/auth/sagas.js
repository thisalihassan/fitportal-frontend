import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';
import { toast } from 'react-toastify';

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
		if (payload.email && payload.password) {
			const response = yield call(loginDetailsFetch, payload);
			console.log(response);
			if (!response) {
				toast.error('Oops you entered invalid credentials');
			} else if (response.errors) {
				toast.error('Oops you entered invalid credentials');
			} else if (response.msg) {
				toast.error('Oops you entered invalid credentials');
			} else {
				localStorage.setItem('id_token', response.token);
				yield put({
					type: actions.LOGIN_FETCH,
					payload: response
				});
			}
		} else {
			toast.error('Oops you entered invalid credentials');
		}
	});
}

export function* userDetails() {
	yield takeEvery(actions.LOGIN_FETCH, function* () {
		headers.access_token = localStorage.getItem('id_token');
		const response = yield call(userDetailsFetch);
		if (response === null) {
		} else if (response.msg === 'Token is not valid') {
			localStorage.removeItem('id_token');
			window.location.reload();
		} else {
			localStorage.setItem('role', response.role);
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
