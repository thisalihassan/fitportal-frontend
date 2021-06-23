import actions from './actions';
const initState = {
	user: null,
	error: ''
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.LOGOUT:
			return {
				...state,
				user: null,
				error: ''
			};
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				error: '',
				user: action.payload
			};
		case actions.LOGIN_ERROR:
			return {
				...state,
				error: action.payload
			};

		default:
			return state;
	}
}
