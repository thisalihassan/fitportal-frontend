import React, { useState, Fragment } from 'react';
import logo from '../../../assets/images/endless-logo.png';
import UserMenu from './userMenu';
import { Link } from 'react-router-dom';
import { AlignLeft, MoreHorizontal } from 'react-feather';
import authActions from '../../../redux/auth/actions';
import { connect } from 'react-redux';
const { logoutUser } = authActions;

const Header = ({ logoutUser, user }) => {
	const [sidebar, setSidebar] = useState(false);
	const [headerbar, setHeaderbar] = useState(true);

	const openCloseSidebar = () => {
		if (sidebar) {
			setSidebar(!sidebar);
			document.querySelector('.page-main-header').classList.remove('open');
			document.querySelector('.page-sidebar').classList.remove('open');
		} else {
			setSidebar(!sidebar);
			document.querySelector('.page-main-header').classList.add('open');
			document.querySelector('.page-sidebar').classList.add('open');
		}
	};

	return (
		<Fragment>
			<div className='page-main-header'>
				<div className='main-header-right row'>
					<div className='main-header-left d-lg-none'>
						<div className='logo-wrapper'>
							<Link to="/">
								<img className='img-fluid' src={logo} alt='' />
							</Link>
						</div>
					</div>
					<div className='mobile-sidebar d-block'>
						<div className='media-body text-right switch-sm'>
							<label className='switch'>
								<a href='#javascript' onClick={() => openCloseSidebar()}>
									<AlignLeft />
								</a>
							</label>
						</div>
					</div>
					<div className='nav-right col p-0'>
						<ul className={`nav-menus ${headerbar ? '' : 'open'}`}>
							<li>
								
							</li>

							<UserMenu user={user} logoutUser={logoutUser} />
						</ul>
						<div className='d-lg-none mobile-toggle pull-right' onClick={() => setHeaderbar(!headerbar)}>
							<MoreHorizontal />
						</div>
					</div>
					<script id='result-template' type='text/x-handlebars-template'>
						<div className='ProfileCard u-cf'>
							<div className='ProfileCard-avatar'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='feather feather-airplay m-0'>
									<path d='M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1'></path>
									<polygon points='12 15 17 21 7 21 12 15'></polygon>
								</svg>
							</div>
							<div className='ProfileCard-details'>
								<div className='ProfileCard-realName'></div>
							</div>
						</div>
					</script>
					<script id='empty-template' type='text/x-handlebars-template'>
						<div className='EmptyMessage'>{'Your search turned up 0 results. This most likely means the backend is down, yikes!'}</div>
					</script>
				</div>
			</div>
		</Fragment>
	);
};
const mapStateToProps = (state) => ({
	user: state.authReducer.user,
})

export default connect(mapStateToProps, { logoutUser })(Header);
