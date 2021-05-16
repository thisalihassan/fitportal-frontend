import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';

import Signup from './auth/signup';
import ForgetPwd from './pages/forgetPwd';
import ResetPwd from './pages/resetPwd';
import Signin from './auth/signin';
import Conformation from './auth/confirmation';
//config data
import configDB from './data/customizer/config';

import PrivateRoute from './PrivateRoute';
const Root = () => {
	useEffect(() => {
		const color = localStorage.getItem('color');
		const layout = localStorage.getItem('layout_version') || configDB.data.color.layout_version;
		document.body.classList.add(layout);
		console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
		console.disableYellowBox = true;
		document.getElementById('color').setAttribute('href', ` /assets/css/${color}.css`);

		// eslint-disable-next-line
	}, []);

	return (
		<div className='App'>
			<Provider store={store}>
				<BrowserRouter basename={`/`}>
					<Switch>
						<Route path="/conformation/:id/:token" component={Conformation} />
						<Route path="/login" component={Signin} />
						<Route path="/signup" component={Signup} />
						<Route path="/pages/forgetPwd" component={ForgetPwd} />
						<Route path="/pages/resetPwd" component={ResetPwd} />

						<PrivateRoute />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
