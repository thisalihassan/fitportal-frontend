import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';

const fetchUnpaidInvoicesRequest = async () =>
	await fetch(`${API_URL}/invoice/upaid`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const fetchPaidInvoicesRequest = async () =>
	await fetch(`${API_URL}/invoice/paid`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const createInvoiceRequest = async (payload) =>
	await fetch(`${API_URL}/invoice`, {
		method: 'POST',
		headers,
		body: JSON.stringify(payload)
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const updateInvoiceRequest = async (payload) =>
	await fetch(`${API_URL}/invoice`, {
		method: 'PUT',
		headers,
		body: JSON.stringify(payload)
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const fetchLast30DaysInvoices = async () =>
	await fetch(`${API_URL}/invoice/last30days`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

export function* fetchUnpaidInvoices() {
	yield takeEvery(actions.FETCH_UNPAID_INVOICES, function* () {
		headers.access_token = localStorage.getItem('id_token');
		const response = yield call(fetchUnpaidInvoicesRequest);
		if (!response) {
			console.log(response);
		} else {
			yield put({
				type: actions.FETCH_UNPAID_INVOICES_SUCCESS,
				payload: response
			});
		}
	});
}

export function* fetchPaidInvoices() {
	yield takeEvery(actions.FETCH_PAID_INVOICES, function* () {
		headers.access_token = localStorage.getItem('id_token');
		const response = yield call(fetchUnpaidInvoicesRequest);
		if (!response) {
			console.log(response);
		} else {
			yield put({
				type: actions.FETCH_PAID_INVOICES_SUCCESS,
				payload: response
			});
		}
	});
}

export function* createInvoice() {
	yield takeEvery(actions.CREATE_INCOICE, function* (data) {
		const { payload } = data;
		console.log(payload);
		if (payload) {
			const response = yield call(createInvoiceRequest, payload);
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
