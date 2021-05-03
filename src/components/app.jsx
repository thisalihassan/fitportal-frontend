import React, { Fragment } from 'react';
import Header from './common/header-component/header';
import Sidebar from './common/sidebar-component/sidebar';
import Footer from './common/footer';
import { ToastContainer } from 'react-toastify';
import Loader from './common/loader';

const AppLayout = (props) => {
	return (
		<Fragment>
			<Loader />
			<div className='page-wrapper'>
				<div className='page-body-wrapper'>
					<Header />
					<Sidebar />
					<div className='page-body'>{props.children}</div>
					<Footer />
				</div>
			</div>
			<ToastContainer />
		</Fragment>
	);
};

export default AppLayout;
