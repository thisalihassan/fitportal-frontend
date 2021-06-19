import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import {Modal, Button} from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import invoiceActions from '../../redux/invoice/actions';
import customerActions from '../../redux/customers/actions';
import moment from 'moment'
import DisplayInitials from '../common/displayInitials';
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
		label: 'Pic',
		field: 'avatar',
		width: 50,
	},
	{
		label: 'Who',
		field: 'name',
		width: 270,
		attributes: {
			'aria-controls': 'DataTable',
			'aria-label': 'name'
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
				const customerObj = { name: user.name, customerID: user.id, user: user._id, price, dueDate:  moment(unPaidInvoices[i].dueDate).format("LL"), _id };
				customerObj.avatar = user.avatar? <img className="img-50 rounded-circle" alt="" src={user.avatar} />: <DisplayInitials size={50} picID={i+20} name={user.name} />
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
		if (customers.length && !options.length) {
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
				const customerObj = { name: user.name, customerID: user.id, user: user._id, price, dueDate:  moment(paidInvoices[i].dueDate).format("LL"), _id };
				customerObj.avatar = user.avatar? <img className="img-50 rounded-circle" alt="" src={user.avatar} />: <DisplayInitials size={50} picID={i+60} name={user.name} />
				fetchedInvoices.push(customerObj);
			}
			setPaidDataTable({ ...paidDataTable, rows: fetchedInvoices });
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
		<Modal
        show={toggleModal}
        onHide={changeModalToggle}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Daily Weights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={changeModalToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={modalSubmitHandler}>Add</Button>
        </Modal.Footer>
      </Modal>
	
			<Breadcrumb parent='Dashboard' title='Invoice Manager' />
			<button style={{ marginLeft:20, marginTop: '-16px', marginBottom: 12 }} className='btn btn-pill btn-primary'  onClick={() => changeModalToggle()}>
				Create Invoice
			</button>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-12 col-md-12'>
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

					<div className='col-xl-12 col-md-12'>
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
