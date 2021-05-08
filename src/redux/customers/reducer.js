import actions from './actions';
const initState = {
	customers: [],
	singleCustomer: null,
	customerWeights: null
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.CUSTOMERSSUCCESS:
			return {
				...state,
				customers: action.payload
			};
		case actions.SINGLECUSTOMERDETAIL:
			return {
				...state,
				singleCustomer: action.payload
			};
		case actions.CUSTOMER_WEIGHTS_DETAIL:
			return {
				...state,
				customerWeights: action.payload
			};
		default:
			return state;
	}
}
