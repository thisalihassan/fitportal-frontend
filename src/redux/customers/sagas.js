import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';

const userFetch = async () =>
	await fetch(`${API_URL}/user/all-users`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);
const singleUserFetch = async (payload) =>
	await fetch(`${API_URL}/user/${payload.id}`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const customerWeights = async (payload) =>
	await fetch(`${API_URL}/weight/user-weights/${payload.id}`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

export function* fetchCustomers() {
	yield takeEvery(actions.ALLCUSTOMERS, function* () {
        headers.access_token = localStorage.getItem('id_token');
			const response  = yield call(userFetch);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.CUSTOMERSSUCCESS,
					payload: response
				});
			}
		
	});
}
export function* fetchSingleCustomer() {
	yield takeEvery(actions.SINGLECUSTOMER, function* (data) {
		const { payload } = data;
		console.log(payload)
		if (payload) {
			const response  = yield call(singleUserFetch, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.SINGLECUSTOMERDETAIL,
					payload: response
				});
			}
		}
	});
}

export function* fetchCustomerWeight() {
	yield takeEvery(actions.CUSTOMER_WEIGHTS, function* (data) {
		const { payload } = data;
		console.log(payload)
		if (payload) {
			const response  = yield call(customerWeights, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.CUSTOMER_WEIGHTS_DETAIL,
					payload: response
				});
			}
		}
	});
}

export default function* rootSaga() {
	yield all([fork(fetchCustomers), fork(fetchSingleCustomer), fork(fetchCustomerWeight)]);
}
