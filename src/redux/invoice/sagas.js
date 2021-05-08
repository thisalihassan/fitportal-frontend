import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';

const fetchUnpaidInvoicesRequest = async () =>
	await fetch(`${API_URL}/invoice/unpaid`, {
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
	await fetch(`${API_URL}/invoice/${payload.id}`, {
		method: 'PUT',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const fetchLast30DaysInvoicesRequest = async () =>
	await fetch(`${API_URL}/invoice/last-thirty-days`, {
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
		const response = yield call(fetchPaidInvoicesRequest);
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
	yield takeEvery(actions.CREATE_INVOICE, function* (data) {
		const { payload } = data;
		headers.access_token = localStorage.getItem('id_token');
		if (payload) {
			const response = yield call(createInvoiceRequest, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.FETCH_PAID_INVOICES
				});
				yield put({
					type: actions.FETCH_UNPAID_INVOICES
				});
			}
		}
	});
}

export function* updateInvoice() {
	yield takeEvery(actions.UPDATE_INVOICE, function* (data) {
		const { payload } = data;
		headers.access_token = localStorage.getItem('id_token');
		if (payload) {
			console.log(payload.id);
			const response = yield call(updateInvoiceRequest, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.FETCH_PAID_INVOICES
				});
				yield put({
					type: actions.FETCH_UNPAID_INVOICES
				});
			}
		}
	});
}

export function* fetchLast30DaysInvoices() {
	yield takeEvery(actions.FETCH_LAST_30_DAYS_INVOICES, function* () {
		headers.access_token = localStorage.getItem('id_token');
		const response = yield call(fetchLast30DaysInvoicesRequest);
		console.log(response);
		if (!response) {
			console.log(response);
		} else {
			yield put({
				type: actions.FETCH_LAST_30_DAYS_INVOICES_SUCCESS,
				payload: response
			});
		}
	});
}

export default function* rootSaga() {
	yield all([
		fork(fetchLast30DaysInvoices),
		fork(updateInvoice),
		fork(createInvoice),
		fork(fetchUnpaidInvoices),
		fork(fetchPaidInvoices)
	]);
}
