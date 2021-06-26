// export const API_URL = 'https://fitportal-backend.herokuapp.com';
export const API_URL = 'http://localhost:6600';
export const CONFIG = {
	headers: {
		'Content-Type': 'application/json'
	}
};

export const headers = {
	'Content-Type': 'application/json; charset=UTF-8',
	access_token: localStorage.getItem('id_token')
};
