import actions from './actions';
const initState = {
	oldInvoices: [],
	unPaidInvoices: [],
	paidInvoices: []
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.FETCH_LAST_30_DAYS_INVOICES_SUCCESS:
			return {
				...state,
				oldInvoices: action.payload
			};
		case actions.FETCH_UNPAID_INVOICES_SUCCESS:
			return {
				...state,
				unPaidInvoices: action.payload
			};
		case actions.FETCH_PAID_INVOICES_SUCCESS:
			return {
				...state,
				paidInvoices: action.payload
			};
		default:
			return state;
	}
}
