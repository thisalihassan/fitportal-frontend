import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { EditProfile } from '../../../constant';

const UserMenu = ({ history, logoutUser }) => {
	const [profile, setProfile] = useState('');

	const authenticated = JSON.parse(localStorage.getItem('authenticated'));
	const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));

	useEffect(() => {
		setProfile(localStorage.getItem('profileURL') || man);
	}, []);

	const Logout_From_Auth0 = () => {
		localStorage.removeItem('id_token');
		logoutUser();
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<Fragment>
			<li className='onhover-dropdown'>
				<div className='media align-items-center'>
					<img
						className='align-self-center pull-right img-50 rounded-circle blur-up lazyloaded'
						src={authenticated ? auth0_profile.picture : profile}
						alt='header-user'
					/>
					<div className='dotted-animation'>
						<span className='animate-circle'></span>
						<span className='main-circle'></span>
					</div>
				</div>
				<ul className='profile-dropdown onhover-show-div p-20 profile-dropdown-hover'>
					<li>
						<Link to="/dashboard/users/userEdit">
							<User />
							{EditProfile}
						</Link>
					</li>
					<li>
						<a onClick={Logout_From_Auth0} href='#javascript'>
							<LogOut /> {'Log out'}
						</a>
					</li>
				</ul>
			</li>
		</Fragment>
	);
};

export default withRouter(UserMenu);
