import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_URL, CONFIG } from '../services/helper';

const Conformation = (props) => {
	useEffect(() => {
		async function sendToken() {
			try {
				const { id, token } = props.match.params;
				const body = JSON.stringify({ id, token });
				const response = await axios.post(API_URL + '/auth/confirmation', body, CONFIG);
				console.log(response);
				if (response.status < 300) {
					props.history.push('/login');
				} else {
					alert(response.body);
				}
			} catch (error) {
				alert(error.message);
			}
		}
		sendToken();
	}, [props.history, props.match.params]);
	return <></>;
};

export default withRouter(Conformation);
