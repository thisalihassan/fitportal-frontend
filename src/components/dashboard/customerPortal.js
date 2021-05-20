import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL, CONFIG } from '../../services/helper';
import { connect } from 'react-redux';
import {  Redirect } from 'react-router-dom';
import customerActions from '../../redux/customers/actions';
const { fetchCustomers } = customerActions;

const CustomerPortal = ({ fetchCustomers, customers, user }) => {
	const [redirect, setredirect] = React.useState(false)
	const [datatable, setDatatable] = React.useState({
		columns: [
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
				label: 'Actions',
				field: 'actions',
				width: 270
			}
		]
	});

	const handleDelete = async (id) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');

		await axios.delete(`${API_URL}/user/${id}`, CONFIG);
	};

	useEffect(() => {
		if(user && user.role === 'customer'){
			setredirect(true);
		}
	}, [user])

	useEffect(() => {
		fetchCustomers();
	}, [fetchCustomers]);
	useEffect(() => {
		if (customers) {
			for (var i = 0; i < customers.length; i++) {
				const id = customers[i]._id;
				customers[i].actions = (
					<div>
						<Link
							to={`/dashboard/users/userEdit/${customers[i]._id}`}
							className='btn btn-pill btn-primary mb-2'
							type='button'>
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

	if(redirect)
		return <Redirect to={`/dashboard/users/userEdit/${user._id}`}/>
	
	return (
		<Fragment>
			<Breadcrumb parent='Dashboard' title='Customers' />
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12 col-md-12'>
						<div className='card'>
							<div className='card-header'>
								<h4>Customers</h4>
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
