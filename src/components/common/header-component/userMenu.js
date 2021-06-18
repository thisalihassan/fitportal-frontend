import React, { Fragment} from 'react';
import { User, LogOut } from 'react-feather';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { EditProfile } from '../../../constant';
import DisplayInitials from '../displayInitials';

const UserMenu = ({ history, logoutUser, user }) => {


	const Logout_From_Auth0 = () => {
		localStorage.removeItem('id_token');
		logoutUser();
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	return (
		<Fragment>
			{user && <li className='onhover-dropdown'>
				<div className='media align-items-center'>
					
					<div className='align-self-center pull-right img-50 rounded-circle blur-up lazyloaded'>
					{user.avatar ? <img className="img-50 rounded-circle" alt="" src={user.avatar} />: <DisplayInitials size={50} picID={2} name={user.name} />}
					</div>
					
				</div>
				<ul className='profile-dropdown onhover-show-div p-20 profile-dropdown-hover'>
					<li>
						<Link to={"/dashboard/users/userEdit/" + user._id}>
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
			</li>}
		</Fragment>
	);
};

export default withRouter(UserMenu);
