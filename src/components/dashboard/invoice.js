import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import Select from 'react-select';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import invoiceActions from '../../redux/invoice/actions';
import customerActions from '../../redux/customers/actions';
const { fetchCustomers } = customerActions;
const { fetchUnpaidInvoices, fetchPaidInvoices, createInvoice, updateInvoice } = invoiceActions;

const options = [];
const columns = [
	{
		label: 'Customer ID',
		field: 'customerID',
		width: 150,
		attributes: {
			'aria-controls': 'DataTable',
			'aria-label': 'customerID'
		}
	},
	{
		label: 'Price',
		field: 'price',
		width: 150
	},
	{
		label: 'Due Date',
		field: 'dueDate',
		width: 270
	},
	{
		label: 'Who',
		field: 'name',
		width: 270,
		attributes: {
			'aria-controls': 'DataTable',
			'aria-label': 'name'
		}
	}
];

const otherOptions = [
	{ value: true, label: 'Paid' },
	{ value: false, label: 'Not Paid' }
];

const Invoice = ({
	fetchUnpaidInvoices,
	fetchPaidInvoices,
	fetchCustomers,
	customers,
	createInvoice,
	updateInvoice,
	unPaidInvoices,
	paidInvoices
}) => {
	const [toggleModal, setToggleModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [selectPaidOption, setselectPaidOption] = useState(null);
	const [formData, setFormData] = useState({ price: 0, dueDate: new Date() });
	const [unPaidDataTable, setUnpaidDataTable] = useState({
		columns: [
			...columns,
			{
				label: 'Actions',
				field: 'actions',
				width: 270
			}
		]
	});

	const [paidDataTable, setPaidDataTable] = useState({
		columns: [...columns]
	});
	const changeModalToggle = () => {
		setToggleModal((prevState)=> !prevState);
	};

	const payUp = (id) => {
		updateInvoice({ id });
	};

	useEffect(() => {
		fetchCustomers();
		fetchUnpaidInvoices();
		fetchPaidInvoices();
	}, []);

	useEffect(() => {
		if (unPaidInvoices.length > 0) {
			const fetchedInvoices = [];
			for (let i = 0; i < unPaidInvoices.length; i++) {
				const { price, dueDate, user, _id } = unPaidInvoices[i];
				const customerObj = { name: user.name, customerID: user.id, user: user._id, price, dueDate, _id };
				customerObj.actions = (
					<button onClick={() => payUp(_id)} className='btn btn-pill btn-danger mb-2' type='button'>
						PayUp
					</button>
				);
				fetchedInvoices.push(customerObj);
			}
			setUnpaidDataTable({ ...unPaidDataTable, rows: fetchedInvoices });
		}
	}, [unPaidInvoices]);

	useEffect(() => {
		if (customers.length) {
			for (let i = 0; i < customers.length; i++) {
				const { name, _id, id } = customers[i];
				const customerObj = { value: _id, label: `${name} ${id}` };
				options.push(customerObj);
			}
		}
	}, [customers]);

	useEffect(() => {
		if (paidInvoices.length > 0) {
			const fetchedInvoices = [];
			for (let i = 0; i < paidInvoices.length; i++) {
				const { price, dueDate, user, _id } = paidInvoices[i];
				const customerObj = { name: user.name, customerID: user.id, user: user._id, price, dueDate, _id };
				fetchedInvoices.push(customerObj);
			}
			setPaidDataTable({ ...unPaidDataTable, rows: fetchedInvoices });
		}
	}, [paidInvoices]);




	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
	};

	const handlePaidOptions = (selectPaidOption) => {
		setselectPaidOption(selectPaidOption);
	};

	const modalSubmitHandler = () => {
		const { price, dueDate } = formData;
		const payload = { price, dueDate };
		payload.isPaid = selectPaidOption.value;
		payload.user = selectedOption.value;
		createInvoice(payload);
	};
	
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<Fragment>
			<MDBContainer>
				<MDBModal isOpen={toggleModal} >
					<MDBModalHeader>Add Daily Weights</MDBModalHeader>
					<MDBModalBody>
						<br></br>
						<div className='form-group'>
							<label className='form-label'>Customer</label>
							<Select value={selectedOption} onChange={handleChange} options={options} />
						</div> 
						<div className='form-group'>
							<label className='form-label'>Price</label>
							<input
								onChange={inputChangeHandler}
								className='form-control'
								type='number'
								min={0}
								name='price'
								placeholder='Enter Price'
							/>
						</div>
						<div className='form-group'>
							<label className='form-label'>Due Date</label>
							<input
								onChange={inputChangeHandler}
								className='form-control'
								type='date'
								name='weight'
								placeholder='Enter weight in kgs'
							/>
						</div>
						<div className='form-group'>
							<label className='form-label'>Is Paid?</label>
							<Select value={selectPaidOption} onChange={handlePaidOptions} options={otherOptions} />
						</div>
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color='secondary' onClick={changeModalToggle}>
							Close
						</MDBBtn>
						<MDBBtn color='primary' onClick={modalSubmitHandler}>
							Add
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
			<Breadcrumb parent='Dashboard' title='Invoice Manager' />
			<button color='primary' onClick={() => changeModalToggle()}>
				Create Invoice
			</button>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-12 xl-50'>
						<div className='card'>
							<div className='card-header'>
								<h4>Due Invoices</h4>
							</div>
							<div className='card-body'>
								<div className='table-responsive shopping-table text-center'>
									<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={unPaidDataTable} />
								</div>
							</div>
						</div>
					</div>

					<div className='col-xl-12 xl-50'>
						<div className='card'>
							<div className='card-header'>
								<h4>Last Paid Invoices</h4>
							</div>
							<div className='card-body'>
								<div className='table-responsive shopping-table text-center'>
									<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={paidDataTable} />
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
		unPaidInvoices: state.invoice.unPaidInvoices,
		paidInvoices: state.invoice.paidInvoices,
		customers: state.customerReducer.customers
	}),
	{ fetchUnpaidInvoices, fetchPaidInvoices, createInvoice, fetchCustomers, updateInvoice }
)(Invoice);
