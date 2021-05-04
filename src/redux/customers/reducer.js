import actions from './actions';
const initState = {
	customers: null,
    singleCustomer: null
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
		default:
			return state;
	}
}