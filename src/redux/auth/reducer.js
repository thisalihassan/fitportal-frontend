import actions from './actions';
const initState = {
	user: null
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload
			};
		case actions.LOGOUT:
			return {
				...state,
				user: null
			};
		default:
			return state;
	}
}
