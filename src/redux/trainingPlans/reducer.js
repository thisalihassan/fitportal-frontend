import actions from './actions';
const initState = {
	trainingPlans: null
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.FETCH_TRAINING_PLANS_SUCCESS:
			return {
				...state,
				trainingPlans: action.payload
			};

		default:
			return state;
	}
}
