import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';

import Signup from './auth/signup';
import UnlockUser from './pages/unlockUser';
import ForgetPwd from './pages/forgetPwd';
import ResetPwd from './pages/resetPwd';
import Maintenance from './pages/maintenance';
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
		document.getElementById('color').setAttribute('href', `${process.env.PUBLIC_URL}/assets/css/${color}.css`);

		// eslint-disable-next-line
	}, []);

	return (
		<div className='App'>
			<Provider store={store}>
				<BrowserRouter basename={`/`}>
					<Switch>
						<Route path={`${process.env.PUBLIC_URL}/conformation/:id/:token`} component={Conformation} />
						<Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
						<Route path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
						<Route path={`${process.env.PUBLIC_URL}/pages/unlockUser`} component={UnlockUser} />
						<Route path={`${process.env.PUBLIC_URL}/pages/forgetPwd`} component={ForgetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/resetPwd`} component={ResetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/maintenance`} component={Maintenance} />

						<PrivateRoute />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
