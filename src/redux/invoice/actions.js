const actions = {
	CREATE_INVOICE: 'CREATE_INCOICE',
	CREATE_INVOICE_SUCCESS: 'CREATE_INVOICE_SUCCESS',
	UPDATE_INVOICE: 'UPDATE_INVOICE',
	FETCH_UNPAID_INVOICES: 'FETCH_UNPAID_INVOICES',
	FETCH_UNPAID_INVOICES_SUCCESS: 'FETCH_UNPAID_INVOICES_SUCCESS',
	FETCH_PAID_INVOICES: 'FETCH_PAID_INVOICES',
	FETCH_PAID_INVOICES_SUCCESS: 'FETCH_PAID_INVOICES_SUCCESS',
	FETCH_LAST_30_DAYS_INVOICES: 'FETCH_LAST_30_DAYS_INVOICES',
	FETCH_LAST_30_DAYS_INVOICES_SUCCESS: 'FETCH_LAST_30_DAYS_INVOICES_SUCCESS',
	createInvoice: (payload) => ({
		type: actions.CREATE_INVOICE,
		payload
	}),
	updateInvoice: (payload) => ({
		type: actions.UPDATE_INVOICE,
		payload
	}),

	fetchUnpaidInvoices: () => ({
		type: actions.FETCH_UNPAID_INVOICES
	}),
	fetchUnpaidInvoicesSuccess: (payload) => ({
		type: actions.FETCH_UNPAID_INVOICES_SUCCESS,
		payload
	}),

	fetchPaidInvoices: () => ({
		type: actions.FETCH_PAID_INVOICES
	}),
	fetchPaidInvoicesSuccess: (payload) => ({
		type: actions.FETCH_PAID_INVOICES_SUCCESS,
		payload
	}),
	getLast30DaysInvoices: (payload) => ({
		type: actions.FETCH_LAST_30_DAYS_INVOICES,
		payload
	}),
	getLast30DaysInvoicesSuccess: (payload) => ({
		type: actions.FETCH_LAST_30_DAYS_INVOICES_SUCCESS,
		payload
	})
};
export default actions;
