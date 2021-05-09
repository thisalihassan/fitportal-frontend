const actions = {
	ALLCUSTOMERS: 'ALLCUSTOMERS',
	SINGLECUSTOMER: 'SINGLECUSTOMERS',
	SINGLECUSTOMERDETAIL: 'SINGLECUSTOMERDETAIL',
	CUSTOMERSSUCCESS: 'CUSTOMERSSUCCESS',

	CUSTOMER_WEIGHTS: 'CUSTOMER_WEIGHTS',
	CUSTOMER_WEIGHTS_DETAIL: 'CUSTOMER_WEIGHTS_DETAIL',
	fetchCustomers: () => ({
		type: actions.ALLCUSTOMERS
	}),
	fetchSingleCustomer: (payload) => ({
		type: actions.SINGLECUSTOMER,
		payload
	}),

	fetchCustomerWeight: (payload) => ({
		type: actions.CUSTOMER_WEIGHTS,
		payload
	}),

	WeightSuccess: (payload) => ({
		type: actions.CUSTOMER_WEIGHTS_DETAIL,
		payload
	}),

	Success: (payload) => ({
		type: actions.CUSTOMERSSUCCESS,
		payload
	}),
	SingleSuccess: (payload) => ({
		type: actions.SINGLECUSTOMERDETAIL,
		payload
	})
};
export default actions;
