import actions from './actions';
const initState = {
	oldInvoices: [],
	unPaidInvoices: [],
	paidInvoices: [],
	profit: null,
	expenses: null
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.FETCH_LAST_30_DAYS_INVOICES_SUCCESS:
			const { unPaidInvoices, paidInvoices, profit, expenses } = action.payload;
			return {
				...state,
				unPaidInvoices,
				paidInvoices,
				profit,
				expenses
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
