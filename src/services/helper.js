export const API_URL =
	process.env.NODE_ENV === 'production' ? 'https://fitportal-backend.herokuapp.com' : 'http://localhost:6600';
export const CONFIG = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const headers = {
	'Content-Type': 'application/json; charset=UTF-8',
	access_token: localStorage.getItem('id_token')
};
