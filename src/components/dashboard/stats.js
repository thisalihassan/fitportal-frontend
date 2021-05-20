import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import invoiceActions from '../../redux/invoice/actions';
import { Line } from 'react-chartjs-2';
const { getLast30DaysInvoices } = invoiceActions;
const Stats = ({ getLast30DaysInvoices, expenses, profit, invoiceDatasets }) => {
	const [paidDataset, setPaidDataset] = useState({
		label: 'Paid',
		data: [],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	});

	const [unPaidDataset, setUnpaidDataset] = useState({
		label: 'Unpaid',
		data: [],
		fill: false,
		borderColor: 'rgb(0, 112, 112)',
		tension: 0.1
	});
	const [formData, setFormData] = React.useState({
		from: '',
		to: ''
	});
	useEffect(() => {
		getLast30DaysInvoices();
	}, []);

	useEffect(() => {
		const { unpaidDataset } = invoiceDatasets;

		console.log(unpaidDataset);
		if (unpaidDataset && unpaidDataset.length) {
			setUnpaidDataset((prevState) => ({ ...prevState, data: unpaidDataset }));
		}
	}, [invoiceDatasets.unpaidDataset]);

	useEffect(() => {
		const { paidDataset } = invoiceDatasets;
		if (paidDataset && paidDataset.length) {
			setPaidDataset((prevState) => ({ ...prevState, data: paidDataset }));
		}
	}, [invoiceDatasets.paidDataset]);

	const dateHandler = (value) => {
		setFormData({ ...formData, from: value });
	};
	const toDateHandler = (value) => {
		setFormData({ ...formData, to: value });
	};
	return (
		<Fragment>
			<Breadcrumb parent='Dashboard' title='Invoice Manager' />
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-xl-4 col-md-4'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Invoices</h5>
								<p class='card-text'>{profit}</p>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-xl-4 col-md-4'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Expenses</h5>
								<p class='card-text'>{expenses}</p>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-xl-4 col-md-4'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Net Profit</h5>
								<p class='card-text'>{[profit - expenses]}</p>
							</div>
						</div>
					</div>
				</div>
				<Line data={{ labels: invoiceDatasets.labels, datasets: [unPaidDataset, paidDataset] }} />
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		invoiceDatasets: state.invoice.invoiceDatasets,
		expenses: state.invoice.expenses,
		profit: state.invoice.profit
	}),
	{ getLast30DaysInvoices }
)(Stats);
