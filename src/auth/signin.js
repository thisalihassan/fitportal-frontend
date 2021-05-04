import React, { useState, useEffect } from 'react';
import logo from '../assets/images/endless-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import { LOGIN, YourName, Password, Login, SignUp } from '../constant';
import authActions from '../redux/auth/actions';
import { connect } from 'react-redux';

const { loginUser, fetchLoginDetails } = authActions;

const Signin = ({ history, loginUser, fetchLoginDetails, user }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (user && user.msg) {
			toast.error('Oppss.. The password is invalid or the user does not have a password.');
		}
		if (localStorage.getItem('id_token')) {
			fetchLoginDetails();
		}
	}, [fetchLoginDetails, user]);

	useEffect(() => {
		if (user && user.name) {
			history.push('/endless/dashboard');
		}
	}, [history, user]);

	const loginWithJwt = (email, password) => {
		loginUser({ email, password });
	};

	return (
		<div>
			<div className='page-wrapper'>
				<div className='container-fluid p-0'>
					{/* <!-- login page start--> */}
					<div className='authentication-main'>
						<div className='row'>
							<div className='col-md-12'>
								<div className='auth-innerright'>
									<div className='authentication-box'>
										<div className='text-center'>
											<img src={logo} alt='' />
										</div>
										<div className='card mt-4'>
											<div className='card-body'>
												<div className='text-center'>
													<h4>{LOGIN}</h4>
													<h6>{'Enter your Username and Password'} </h6>
												</div>
												<form className='theme-form'>
													<div className='form-group'>
														<label className='col-form-label pt-0'>{YourName}</label>
														<input
															className='form-control'
															type='email'
															name='email'
															value={email}
															onChange={(e) => setEmail(e.target.value)}
															placeholder='Email address'
														/>
													</div>
													<div className='form-group'>
														<label className='col-form-label'>{Password}</label>
														<input
															className='form-control'
															type='password'
															name='password'
															value={password}
															onChange={(e) => setPassword(e.target.value)}
														/>
													</div>

													<div className='form-group form-row mt-3 mb-0'>
														<button className='btn btn-secondary btn-block' type='button' onClick={() => loginWithJwt(email, password)}>
															{Login}
														</button>
													</div>
													<div className='form-group form-row mt-3 mb-0'>
														<div className='text-center'>
															{'Not a user?'}  
															<a className='btn-link text-capitalize' href='signup'>
																{SignUp}
															</a>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ToastContainer />
					{/* <!-- login page end--> */}
				</div>
			</div>
		</div>
	);
};

export default withRouter(
	connect(
		(state) => ({
			user: state.authReducer.user
		}),
		{ loginUser, fetchLoginDetails }
	)(Signin)
);
