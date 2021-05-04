import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux **
import { Provider } from 'react-redux';
import store from './store';

import LoginWithBgImg from './pages/loginWithBgImg';
import LoginWithVideo from './pages/loginWithVideo';
import Signup from './auth/signup';
import SignupWithImg from './pages/signupWithImg';
import SignupWithVideo from './pages/signupWithVideo';
import UnlockUser from './pages/unlockUser';
import ForgetPwd from './pages/forgetPwd';
import ResetPwd from './pages/resetPwd';
import ComingSoon from './pages/comingsoon';
import ComingSoonImg from './pages/comingsoonImg';
import ComingSoonVideo from './pages/comingsoonVideo';
import Maintenance from './pages/maintenance';
import Error400 from './pages/errors/error400';
import Error401 from './pages/errors/error401';
import Error403 from './pages/errors/error403';
import Error404 from './pages/errors/error404';
import Error500 from './pages/errors/error500';
import Error503 from './pages/errors/error503';
import Signin from './auth/signin';
import Conformation from './auth/confirmation';
//config data
import configDB from './data/customizer/config';
import Callback from './auth/callback';

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
						<Route path={`${process.env.PUBLIC_URL}/pages/loginWithBgImg`} component={LoginWithBgImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/loginWithVideo`} component={LoginWithVideo} />

						<Route path={`${process.env.PUBLIC_URL}/pages/signupWithImg`} component={SignupWithImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/signupWithVideo`} component={SignupWithVideo} />
						<Route path={`${process.env.PUBLIC_URL}/pages/unlockUser`} component={UnlockUser} />
						<Route path={`${process.env.PUBLIC_URL}/pages/forgetPwd`} component={ForgetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/resetPwd`} component={ResetPwd} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoon`} component={ComingSoon} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoonImg`} component={ComingSoonImg} />
						<Route path={`${process.env.PUBLIC_URL}/pages/comingsoonVideo`} component={ComingSoonVideo} />
						<Route path={`${process.env.PUBLIC_URL}/pages/maintenance`} component={Maintenance} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error400`} component={Error400} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error401`} component={Error401} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error403`} component={Error403} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error404`} component={Error404} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error500`} component={Error500} />
						<Route path={`${process.env.PUBLIC_URL}/pages/errors/error503`} component={Error503} />
						<Route path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback />} />

						<PrivateRoute />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
};

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
