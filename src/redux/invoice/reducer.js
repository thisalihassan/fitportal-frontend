import actions from './actions';
const initState = {
	invoiceDatasets: {},
	unPaidInvoices: [],
	paidInvoices: [],
	profit: null,
	expenses: null
};

export default function interviewReducer(state = initState, action) {
	switch (action.type) {
		case actions.FETCH_LAST_30_DAYS_INVOICES_SUCCESS:
			const { paidDataset, unpaidDataset, profit, expenses, labels } = action.payload;
			return {
				...state,
				invoiceDatasets: { paidDataset, unpaidDataset, labels },
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
