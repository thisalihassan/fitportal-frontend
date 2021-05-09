import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import App from './components/app';

import CustomerPortal from './components/dashboard/customerPortal';
import BlogPost from './components/dashboard/blogPost';
import SingleBlog from './components/dashboard/blogSingle';
import Training from './components/dashboard/training';
import Invoice from './components/dashboard/invoice';
import Plans from './components/dashboard/plans';
import EditPlans from './components/dashboard/editPlaning';
import Stats from './components/dashboard/stats';

// users
import UserProfile from './components/users/userProfile';
import UserEdit from './components/users/userEdit';
import UserCards from './components/users/user-cards';
import { Route, Redirect } from 'react-router-dom';
import BlogDetail from './components/dashboard/blogDetail';

const AppComp = ({ user }) => {
	const [jwtToken, setToken] = useState(localStorage.getItem('id_token'));
	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		if (user && user.name && !authenticated) {
			setAuthenticated(true);
		}
		// eslint-disable-next-line
	}, [authenticated, user]);

	return (
		<>
			{jwtToken || authenticated ? (
				<App>
					{/* dashboard menu */}
					<Route
						exact
						path={`${process.env.PUBLIC_URL}/`}
						render={() => {
							return <Redirect to={`${process.env.PUBLIC_URL}/dashboard/customers`} />;
						}}
					/>
					<Route path={`${process.env.PUBLIC_URL}/dashboard/training-plans`} component={Training} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/invoices`} component={Invoice} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/plans`} exact component={Plans} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/stats`} component={Stats} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/customers`} component={CustomerPortal} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/recipe`} component={BlogPost} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/all/recipes`} component={BlogDetail} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/plans/edit/:index`} exact component={EditPlans} />
					<Route path={`${process.env.PUBLIC_URL}/dashboard/recpie/:id`} exact component={SingleBlog} />

					{/* Users */}
					<Route path={`${process.env.PUBLIC_URL}/users/userProfile`} component={UserProfile} />
					<Route path={`${process.env.PUBLIC_URL}/users/userEdit/:id`} component={UserEdit} />
					<Route path={`${process.env.PUBLIC_URL}/users/userCards`} component={UserCards} />
				</App>
			) : (
				<Redirect to={`${process.env.PUBLIC_URL}/login`} />
			)}
		</>
	);
};

export default connect(
	(state) => ({
		customers: state.customerReducer.customers
	}),
	null
)(AppComp);
