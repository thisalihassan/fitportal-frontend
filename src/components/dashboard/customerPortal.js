import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios';
import { API_URL, CONFIG } from '../../services/helper';
import { connect } from 'react-redux';
import customerActions from '../../redux/customers/actions';
const { fetchCustomers } = customerActions;

const CustomerPortal = ({ fetchCustomers, customers }) => {
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
		fetchCustomers();
	}, [fetchCustomers]);
	useEffect(() => {
		if (customers) {
			for (var i = 0; i < customers.length; i++) {
				const id = customers[i]._id;
				customers[i].actions = (
					<div>
						<a
							href={`/users/userEdit/${customers[i]._id}`}
							className='btn btn-pill btn-primary mb-2'
							type='button'>
							Edit
						</a>
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
	return (
		<Fragment>
			<Breadcrumb parent='Dashboard' title='Customers' />
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-12 xl-50'>
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
		customers: state.customerReducer.customers
	}),
	{ fetchCustomers }
)(CustomerPortal);
