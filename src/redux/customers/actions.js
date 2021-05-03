const actions = {
	ALLCUSTOMERS: 'ALLCUSTOMERS',
    SINGLECUSTOMER: 'SINGLECUSTOMERS',
    SINGLECUSTOMERDETAIL: 'SINGLECUSTOMERDETAIL',
	CUSTOMERSSUCCESS: 'CUSTOMERSSUCCESS',
	fetchCustomers: () => ({
		type: actions.ALLCUSTOMERS,
	}),
    fetchSingleCustomer: (payload) => ({
		type: actions.SINGLECUSTOMER,
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
