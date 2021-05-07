import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import invoiceActions from '../../redux/invoice/actions';
import { connect } from 'react-redux';

const { fetchUnpaidInvoices, fetchPaidInvoices, createInvoice, updateInvoice } = invoiceActions;

const Invoice = ({ fetchUnpaidInvoices, fetchPaidInvoices }) => {
	const [datatable, setDatatable] = React.useState({
		columns: [
			{
				label: 'Price',
				field: 'price',
				width: 150,
				attributes: {
					'aria-controls': 'DataTable',
					'aria-label': 'Name'
				}
			},
			{
				label: 'Due Date',
				field: 'dueDate',
				width: 270
			},
			{
				label: 'Who',
				field: 'name',
				width: 270
			}
		]
	});

	useEffect(() => {
		fetchUnpaidInvoices();
		fetchPaidInvoices();
	}, [fetchPaidInvoices, fetchUnpaidInvoices]);

	return (
		<Fragment>
			<Breadcrumb parent='Dashboard' title='Invoice Manager' />
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-xl-12 xl-50'>
						<div className='card'>
							<div className='card-header'>
								<h4>Due Invoices</h4>
							</div>
							<div className='card-body'>
								<div className='table-responsive shopping-table text-center'>
									<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
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
		unPaidInvoices: state.invoice.unPaidInvoices,
		paidInvoices: state.invoice.paidInvoices
	}),
	{ fetchUnpaidInvoices, fetchPaidInvoices, createInvoice, updateInvoice }
)(Invoice);
