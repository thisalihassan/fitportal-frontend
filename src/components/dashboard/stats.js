import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import invoiceActions from '../../redux/invoice/actions';
import { Line } from 'react-chartjs-2';
const { getLast30DaysInvoices } = invoiceActions;
const Stats = ({ getLast30DaysInvoices, expenses, profit, paidInvoices, unPaidInvoices }) => {
	const [dataset, setDataset] = useState(null);

	const [formData, setFormData] = React.useState({
		from: '',
		to: ''
	});
	useEffect(() => {
		getLast30DaysInvoices();
	}, []);

	useEffect(() => {}, [paidInvoices]);

	useEffect(() => {}, [unPaidInvoices]);
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
					<div className='col-xl-12 xl-50'>
						<div className='card'>
							<div className='card-header'>
								<h4>Filters</h4>
							</div>
							<div className='card-body'>
								<div className={'row'}>
									<div className={'col-md-4'}>
										<div className='form-group'>
											<label className='col-form-label'>From</label>
											<div className='form-row'>
												<DatePicker value={formData.from} onChange={dateHandler} />
											</div>
										</div>
									</div>
									<div className={'col-md-4'}>
										<div className='form-group'>
											<label className='col-form-label'>To:</label>
											<div className='form-row'>
												<DatePicker value={formData.to} onChange={toDateHandler} />
											</div>
										</div>
									</div>
									<div className={'col-md-4'}>
										<button className='btn btn-primary mt-4' type='submit'>
											Search
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-xl-4 xl-50'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Invoices</h5>
								<p class='card-text'>{profit}</p>
							</div>
						</div>
					</div>

					<div className='col-sm-12 col-xl-4 xl-50'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Expenses</h5>
								<p class='card-text'>{expenses}</p>
							</div>
						</div>
					</div>
					<div className='col-sm-12 col-xl-4 xl-50'>
						<div class='card' style={{ width: '18rem' }}>
							<div class='card-body'>
								<h5 class='card-title ml-5'>Net Profit</h5>
								<p class='card-text'>{[profit - expenses]}</p>
							</div>
						</div>
					</div>
				</div>
				<Line />
			</div>
		</Fragment>
	);
};

export default connect(
	(state) => ({
		unPaidInvoices: state.invoice.unPaidInvoices,
		paidInvoices: state.invoice.paidInvoices,
		expenses: state.invoice.expenses,
		profit: state.invoice.profit
	}),
	{ getLast30DaysInvoices }
)(Stats);
