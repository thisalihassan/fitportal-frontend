import React, { Fragment, useState } from 'react';
import logo from '../assets/images/endless-logo.png';
import { Name, EMAIL, Login, Password, SignUp, BOD } from '../constant';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import { API_URL, CONFIG } from '../services/helper';
import { useForm } from 'react-hook-form';

const SignupWithImg = () => {
	const { register, handleSubmit, errors } = useForm();
	const [formData, setFormData] = useState({
		name: '',
		password: '',
		dateOfBirth: '',
		email: ''
	});

	const { dateOfBirth } = formData;

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const dateHandler = (value) => {
		setFormData({ ...formData, dateOfBirth: value });
	};

	const formSubmitHandler = async (e) => {
		const body = JSON.stringify(formData);
		await axios.post(`${API_URL}/user`, body, CONFIG);
	};

	return (
		<Fragment>
			<div className='page-wrapper'>
				<div className='auth-bg'>
					<div className='authentication-box'>
						<div className='text-center'>
							<img src={logo} alt='' />
						</div>
						<div className='card mt-4 p-4'>
							<h4 className='text-center'>{'NEW USER'}</h4>
							<h6 className='text-center'>{'Enter your Username and Password For Signup'}</h6>
							<form className='theme-form' noValidate='' onSubmit={handleSubmit(formSubmitHandler)}>
								<div className='form-row'>
									<div className='col-md-12'>
										<div className='form-group'>
											<label className='col-form-label'>{Name}</label>
											<input
												onChange={inputChangeHandler}
												name='name'
												className='form-control'
												type='text'
												ref={register({ required: true })}
											/>
										</div>
										<span>{errors.name && 'name is required'}</span>
									</div>
								</div>
								<div className='form-group'>
									<label className='col-form-label'>{EMAIL}</label>
									<input
										className='form-control'
										type='text'
										name='email'
										onChange={inputChangeHandler}
										ref={register({ required: true })}
									/>
									<span>{errors.email && 'Email is required'}</span>
								</div>
								<div className='form-group'>
									<label className='col-form-label'>{Password}</label>
									<input
										className='form-control'
										type='password'
										name='password'
										onChange={inputChangeHandler}
										ref={register({ required: true })}
									/>
									<span>{errors.password && 'name is required'}</span>
								</div>
								<div className='form-group'>
									<label className='col-form-label'>{BOD}</label>
									<div className='form-row'>
										<DatePicker value={dateOfBirth} onChange={dateHandler} />
									</div>
								</div>
								<div className='form-row'>
									<div className='col-sm-4'>
										<button className='btn btn-primary' type='submit'>
											{SignUp}
										</button>
									</div>
									<div className='col-sm-8'>
										<div className='text-left mt-2 m-l-20'>
											{'Are you already user?'}  
											<a className='btn-link text-capitalize' href='login.html'>
												{Login}
											</a>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default SignupWithImg;
