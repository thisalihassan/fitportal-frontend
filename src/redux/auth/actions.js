const actions = {
	LOGIN: 'LOGIN',
	LOGIN_FETCH: 'LOGIN_FETCH',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	login: (payload) => ({
		type: actions.LOGIN,
		payload
	}),
	fetchLoginDetails: () => ({
		type: actions.LOGIN_FETCH
	}),
	loginSuccess: (payload) => ({
		type: actions.LOGIN_SUCCESS,
		payload
	})
};
export default actions;
