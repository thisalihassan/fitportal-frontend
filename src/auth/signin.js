import React, { useState, useEffect } from 'react';
import logo from '../assets/images/endless-logo.png';
import man from '../assets/images/dashboard/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';
import { handleResponse } from '../services/fack.backend';
import { LOGIN, YourName, Password, Login, SignUp } from '../constant';
import { connect } from 'react-redux';

const Signin = ({ history }) => {
	const [email, setEmail] = useState('test@gmail.com');
	const [password, setPassword] = useState('test123');

	const [value, setValue] = useState(localStorage.getItem('profileURL' || man));

	useEffect(() => {
		if (value !== null) localStorage.setItem('profileURL', value);
		else localStorage.setItem('profileURL', man);
	}, [value]);

	const loginWithJwt = (email, password) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: { email, password }
		};

		return fetch('/users/authenticate', requestOptions)
			.then(handleResponse)
			.then((user) => {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				setValue(man);
				localStorage.setItem('token', user);
				window.location.href = `${process.env.PUBLIC_URL}/dashboard/default`;
				return user;
			})
			.catch((error) => {
				setTimeout(() => {
					toast.error('Oppss.. The password is invalid or the user does not have a password.');
				}, 200);
			});
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

export default withRouter(Signin);
