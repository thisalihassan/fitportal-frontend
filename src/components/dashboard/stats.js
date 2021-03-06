import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { connect } from 'react-redux';
import invoiceActions from '../../redux/invoice/actions';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from 'react-date-picker';
import moment from 'moment';
const { getLast30DaysInvoices } = invoiceActions;

const otherOptions = [
	{ value: 30, label: 'Last 30 Days' },
	{ value: 60, label: 'Last 60 Days' },
	{ value: 90, label: 'Last 90 Days' },
	{ value: 'All', label: 'All Past Data' }
];

const Stats = ({ getLast30DaysInvoices, expenses, profit, invoiceDatasets }) => {
	const [paidDataset, setPaidDataset] = useState({
		label: 'Paid',
		data: [],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	});

	const [labels, setLabels] = useState([]);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [unPaidDataset, setUnpaidDataset] = useState({
		label: 'Unpaid',
		data: [],
		fill: false,
		borderColor: 'rgb(0, 112, 112)',
		tension: 0.1
	});

	useEffect(() => {
		const startDate = new Date();
		let endDate = new Date();
		endDate.setDate(endDate.getDate() - 7);
		setEndDate(endDate);
		const payload = JSON.stringify({ startDate, endDate });
		getLast30DaysInvoices(payload);
	}, []);

	useEffect(() => {
		let { labels } = invoiceDatasets;
		if (labels && labels.length) {
			for (let i = 0; i < labels.length; i++) {
				labels[i] = moment(labels[i]).format('l');
			}
		}
		setLabels(labels);
	}, [invoiceDatasets.labels]);

	useEffect(() => {
		handlePaidOptions();
	}, [endDate, startDate]);

	useEffect(() => {
		const { unpaidDataset } = invoiceDatasets;
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

	const handlePaidOptions = () => {
		const payload = JSON.stringify({ startDate, endDate });
		getLast30DaysInvoices(payload);
	};

	return (
		<Fragment>
			<Breadcrumb parent='Dashboard' title='Invoice Manager' />
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-12 col-xl-3 col-md-3'>
						<div class='card' style={{ width: '18rem', height: 220 }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Date Filter</h5>
								<p class='card-text'>
									<div classNames='form-group'>
										<label className='form-label'>Start Date</label>
										<DatePicker value={startDate} onChange={(e) => setStartDate(e)} />
									</div>
									<div classNames='form-group'>
										<label className='form-label'>End Date</label>
										<DatePicker value={endDate} onChange={(e) => setEndDate(e)} />
									</div>
								</p>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-xl-3 col-md-3'>
						<div class='card' style={{ width: '18rem', height: 220 }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Invoices</h5>
								<p class='card-text'>{profit}</p>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-xl-3 col-md-3'>
						<div class='card' style={{ width: '18rem', height: 220 }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Expenses</h5>
								<p class='card-text'>{expenses}</p>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-xl-3 col-md-3'>
						<div class='card' style={{ width: '18rem', height: 220 }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Net Profit</h5>
								<p class='card-text'>{[profit - expenses]}</p>
							</div>
						</div>
					</div>
				</div>
				<Line data={{ labels: labels, datasets: [unPaidDataset, paidDataset] }} />
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
