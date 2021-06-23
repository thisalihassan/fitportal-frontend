const actions = {
	LOGIN: 'LOGIN',
	LOGIN_FETCH: 'LOGIN_FETCH',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR',
	LOGOUT: 'LOGOUT',
	logoutUser: () => ({
		type: actions.LOGOUT
	}),
	loginUser: (payload) => ({
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
