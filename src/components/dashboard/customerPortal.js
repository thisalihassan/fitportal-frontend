import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL, CONFIG } from '../../services/helper';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import customerActions from '../../redux/customers/actions';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { toast } from 'react-toastify';
import DisplayInitials from '../common/displayInitials';
import Select from 'react-select';
const { fetchCustomers } = customerActions;

const otherOptions = [
	{ value: 'customer', label: 'Customer' },
	{ value: 'admin', label: 'Admin' },
	{ value: 'super-admin', label: 'Super Admin' }
];

const CustomerPortal = ({ fetchCustomers, customers, user }) => {
	const [redirect, setredirect] = useState(false);
	const [modal, setModal] = useState(false);
	const [selectPaidOption, setselectPaidOption] = useState(otherOptions[0]);
	const [formData, setFormData] = useState({
		name: '',
		dateOfBirth: '',
		email: ''
	});
	const [datatable, setDatatable] = useState({
		columns: [
			{
				label: 'Pic',
				field: 'avatar',
				width: 50
			},
			{
				label: 'Name',
				field: 'name',
				width: 150,
				attributes: {
					'aria-controls': 'DataTable',
					'aria-label': 'Name'
				}
			},
			{
				label: 'DOB',
				field: 'dateOfBirth',
				width: 270
			},
			{
				label: 'Email',
				field: 'email',
				width: 270
			},
			{
				label: 'Actions',
				field: 'actions',
				width: 270
			}
		]
	});

	const handleDelete = async (id) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		await axios.delete(`${API_URL}/user/${id}`, CONFIG);
		window.location.reload();
	};

	useEffect(() => {
		if (user && user.role === 'customer') {
			setredirect(true);
		}
	}, [user]);

	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);

	useEffect(() => {
		if (customers) {
			for (var i = 0; i < customers.length; i++) {
				const id = customers[i]._id;
				customers[i].avatar = customers[i].avatar ? (
					<img className='img-50 rounded-circle' alt='' src={customers[i].avatar} />
				) : (
					<DisplayInitials size={50} picID={i + 10} name={customers[i].name} />
				);
				customers[i].dateOfBirth = moment(customers[i].dateOfBirth).format('LL');
				customers[i].actions = (
					<div>
						<Link to={`/dashboard/users/userEdit/${customers[i]._id}`} className='btn btn-pill btn-primary mb-2' type='button'>
							Edit
						</Link>
						<button
							onClick={() => {
								handleDelete(id);
							}}
							className='btn btn-pill btn-danger mb-2'
							type='button'>
							Delete
						</button>
					</div>
				);
			}
			setDatatable({ ...datatable, rows: customers });
		}
	}, [customers]);

	const toggle = () => {
		setModal(!modal);
	};
	const inputChangeHandler = (e) => {
		let { name, value } = e.target;
		if (name === 'email') {
			value = value.toLowerCase();
		}
		setFormData({ ...formData, [name]: value });
	};

	const modalSubmitHandler = async (e) => {
		try {
			formData.email = formData.email.trim();
			formData.role = selectPaidOption.value;
			const body = JSON.stringify(formData);
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			const response = await axios.post(`${API_URL}/user`, body, CONFIG);
			if (response.data.msg) {
				toast.error(response.data.msg);
			} else {
				toast.success('Customer Registered Successfully!');
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			}
		} catch (error) {
			if (error.message) {
				toast.error(error.message);
			}
		}
	};

	const handlePaidOptions = (selectPaidOption) => {
		setselectPaidOption(selectPaidOption);
	};

	const dateHandler = (value) => {
		setFormData({ ...formData, dateOfBirth: value });
	};

	if (redirect) return <Redirect to={`/dashboard/users/userEdit/${user._id}`} />;

	return (
		<Fragment>
			<Modal show={modal} onHide={toggle} backdrop='static' keyboard={false}>
				<Modal.Header closeButton>
					<Modal.Title>Customer Registration</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className='form-group'>
						<label className='form-label'>Email</label>
						<input
							className='form-control'
							onChange={inputChangeHandler}
							name='email'
							type='email'
							value={formData.email}
							placeholder='Email'
						/>
					</div>
					<div className='form-group'>
						<label className='form-label'>Name</label>
						<input className='form-control' onChange={inputChangeHandler} name='name' value={formData.name} placeholder='name' />
					</div>
					<div className='form-group'>
						<Select value={selectPaidOption} onChange={handlePaidOptions} options={otherOptions} />
					</div>
					<div className='form-group'>
						<label className='form-label'>Date of Birth</label>
						<DatePicker value={formData.dateOfBirth} onChange={dateHandler} />
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={toggle}>
						Close
					</Button>
					<Button variant='primary' onClick={modalSubmitHandler}>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
			<Breadcrumb parent='Dashboard' title='Customers' />
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12 col-md-12'>
						<div className='card'>
							<div className='card-header'>
								<h4>Customers</h4>
							</div>
							<div>
								<button style={{ marginLeft: 20 }} color='primary' className='btn btn-pill' onClick={toggle}>
									Add Customer
								</button>
							</div>
							<div className='card-body'>
								<div className='table-responsive shopping-table text-center'>
									<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user,
		customers: state.customerReducer.customers
	}),
	{ fetchCustomers }
)(CustomerPortal);
