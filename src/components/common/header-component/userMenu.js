import React, { Fragment, useState, useEffect } from 'react';
import man from '../../../assets/images/dashboard/user.png';
import { User, LogOut } from 'react-feather';
import { firebase_app } from '../../../data/config';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { EditProfile } from '../../../constant';

const UserMenu = ({ history }) => {
	const [profile, setProfile] = useState('');
	// auth0 profile
	const { logout } = useAuth0();
	const authenticated = JSON.parse(localStorage.getItem('authenticated'));
	const auth0_profile = JSON.parse(localStorage.getItem('auth0_profile'));

	useEffect(() => {
		setProfile(localStorage.getItem('profileURL') || man);
	}, []);


	const Logout_From_Auth0 = () => {
		localStorage.removeItem('id_token');
		history.push(`${process.env.PUBLIC_URL}/`);
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
						<Link to={`${process.env.PUBLIC_URL}/users/userEdit`}>
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