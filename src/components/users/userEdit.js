import React, { Fragment, useState, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DisplayInitials from '../common/displayInitials';
import DatePicker from 'react-date-picker';
import { BOD, Save, EmailAddress, NAME, Phone } from '../../constant';
import customerActions from '../../redux/customers/actions';
import { useForm } from 'react-hook-form';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import UserWeights from '../weights/userWeights';
import Plans from '../dashboard/plans';
const { fetchSingleCustomer } = customerActions;

const UserEdit = ({ fetchSingleCustomer, customer, match, user }) => {
	const { register, handleSubmit, errors } = useForm();
	const [activeItem, setActiveItem] = useState('1');
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		dateOfBirth: '',
		id: null,
		password: '',
		avatar: '',
		phone: '',
		address: ''
	});
	const toggle = (tab) => {
		if (activeItem !== tab) {
			setActiveItem(tab);
		}
	};
	const { dateOfBirth, email, name, phone, avatar, address, password } = formData;

	const fileInputChangeHandler = async (e) => {
		const file = e.target.files[0];
		const formDataPic = new FormData();
		formDataPic.append('file', file);
		const configg = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		const res = await axios.post(`${API_URL}/upload-avatar`, formDataPic, configg);
		const avatar = `${API_URL}/profile/${res.data.filename}`;
		setFormData({ ...formData, avatar: `${API_URL}/profile/${avatar}` });
		setTimeout(() => {
			const body = JSON.stringify({ ...formData, avatar });
			updateData(body);
		}, 2000);
	};

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const dateHandler = (value) => {
		setFormData({ ...formData, dateOfBirth: value });
	};

	const formSubmitHandler = async (e) => {
		const body = JSON.stringify(formData);
		updateData(body);
	};

	const updateData = async (body) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const response = await axios.put(`${API_URL}/user/update`, body, CONFIG);
		if (response.status < 300) {
			window.location.reload();
		}
	};

	useEffect(() => {
		fetchSingleCustomer({ id: match.params.id });
	}, [fetchSingleCustomer, match.params.id]);

	useEffect(() => {
		if (customer) {
			setFormData(customer);
		}
	}, [customer]);

	return (
		<Fragment>
			<Breadcrumb parent='User' title='Edit Profile' />
			<Tabs id='controlled-tab-example' activeKey={activeItem} onSelect={(k) => toggle(k)}>
				<Tab eventKey='1' title='Profile'>
					<div className='container-fluid'>
						<div className='edit-profile'>
							<div className='row'>
								<div className='col-lg-2 col-md-2'></div>
								<div className='col-lg-8 col-md-8'>
									<div className='card'>
										<div className='card-header'>
											<h4 className='card-title mb-0'>{`${name}'s Profile`}</h4>
											<div className='card-options'>
												<a className='card-options-collapse' href='javascript' data-toggle='card-collapse'>
													<i className='fe fe-chevron-up'></i>
												</a>
												<a className='card-options-remove' href='javascript' data-toggle='card-remove'>
													<i className='fe fe-x'></i>
												</a>
											</div>
										</div>
										<div className='card-body'>
											<form onSubmit={handleSubmit(formSubmitHandler)}>
												<div className='row mb-2'>
													<div className='col-auto'>
														{avatar ? (
															<img className='img-70 rounded-circle' alt='' src={avatar} />
														) : (
															<DisplayInitials size={70} picID={3} name={name} />
														)}
													</div>
													<input onChange={fileInputChangeHandler} type='file' id='avatar' name='avatar' accept='image/*' />
													<div className='col'>
														<h3 className='mb-1'>{name}</h3>
														<p className='mb-4'>{customer && customer.role}</p>
													</div>
												</div>
												<div className='form-group'>
													<label className='form-label'>{EmailAddress}</label>
													<p>{email}</p>
												</div>
												<div className='form-group'>
													<label className='form-label'>{NAME}</label>
													<input
														className='form-control'
														onChange={inputChangeHandler}
														name='name'
														value={name}
														placeholder='your-name'
														ref={register({ required: true })}
													/>
												</div>
												<span>{errors.name && 'name is required'}</span>
												<div className='form-group'>
													<label className='form-label'>{Phone}</label>
													<input
														className='form-control'
														onChange={inputChangeHandler}
														name='phone'
														value={phone}
														placeholder='your-phone'
														ref={register({ required: true })}
													/>
												</div>
												<div className='form-group'>
													<label className='form-label'>Address</label>
													<input
														className='form-control'
														onChange={inputChangeHandler}
														name='address'
														value={address}
														placeholder='your-address'
														ref={register({ required: true })}
													/>
												</div>
												<div className='form-group'>
													<label className='form-label'>Password</label>
													<input className='form-control' type='password' onChange={inputChangeHandler} name='password' value={password} />
												</div>
												<div className='form-group'>
													<label className='col-form-label'>{BOD}</label>
													<div className='form-row'>
														<DatePicker value={dateOfBirth} onChange={dateHandler} />
													</div>
												</div>
												<div className='form-footer'>
													<button type='submit' className='btn btn-primary btn-block'>
														{Save}
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>

								<div className='col-lg-4'></div>
							</div>
						</div>
					</div>
				</Tab>
				<Tab eventKey='2' title='Weights'>
					<p className='mt-2'>
						<UserWeights userId={match.params.id} />
					</p>
				</Tab>
				{user && user.role !== 'customer' && (
					<Tab eventKey='3' title='Training Plan'>
						<p className='mt-2'>
							<Plans userId={match.params.id} />
						</p>
					</Tab>
				)}
			</Tabs>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user,
		customer: state.customerReducer.singleCustomer
	}),
	{ fetchSingleCustomer }
)(UserEdit);
