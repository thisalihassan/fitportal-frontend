import React, { Fragment, useState } from 'react';
import { User, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { EditProfile } from '../../../constant';

const UserMenu = ({ logoutUser }) => {
	const [profile, setProfile] = useState('');

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
					<img className='align-self-center pull-right img-50 rounded-circle blur-up lazyloaded' src={profile} alt='header-user' />
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
