import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import actions from './actions';
import { API_URL, headers } from '../../services/helper';

const createTrainingPlanRequest = async (payload) =>
	await fetch(`${API_URL}/trainingPlan/`, {
		method: 'POST',
		body: JSON.stringify({ payload }),
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

const fetchTrainingPlansRequest = async (user) =>
	await fetch(`${API_URL}/trainingPlan/${user}`, {
		method: 'GET',
		headers
	})
		.then((res) => res.json())
		.then((res) => res)
		.catch((error) => error);

export function* createTrainingPlans() {
	yield takeEvery(actions.POST_TRAINING_PLAN, function* (data) {
		const { payload } = data;
		headers.access_token = localStorage.getItem('id_token');
		if (payload) {
			const response = yield call(createTrainingPlanRequest, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.FETCH_TRAINING_PLANS,
					payload: payload[0].user
				});
			}
		}
	});
}

export function* fetchTrainingPlans() {
	yield takeEvery(actions.FETCH_TRAINING_PLANS, function* (data) {
		const { payload } = data;
		headers.access_token = localStorage.getItem('id_token');
		if (payload) {
			const response = yield call(fetchTrainingPlansRequest, payload);
			if (!response) {
				console.log(response);
			} else {
				yield put({
					type: actions.FETCH_TRAINING_PLANS_SUCCESS,
					payload: response
				});
			}
		}
	});
}

export default function* rootSaga() {
	yield all([fork(createTrainingPlans), fork(fetchTrainingPlans)]);
}
