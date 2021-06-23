import React, { useEffect, useState } from 'react';
import trainingPlansActions from '../../redux/trainingPlans/actions';
import { connect } from 'react-redux';
import { MDBDataTableV5 } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
const { fetchTrainingPlans, deleteTrainingPlans } = trainingPlansActions;

const Plans = ({ user, plans, fetchTrainingPlans, deleteTrainingPlans }) => {
	const [toggle, setToggle] = useState({ value: false, index: 0 });
	const [datatable, setDatatable] = React.useState({
		columns: [
			{
				label: 'Plan name',
				field: 'planName',
				width: 150,
				attributes: {
					'aria-controls': 'DataTable',
					'aria-label': 'Name'
				}
			},
			{
				label: 'Actions',
				field: 'actions',
				width: 270
			}
		]
	});

	useEffect(() => {
		if (user) {
			console.log(user._id);
			fetchTrainingPlans(user._id);
		}
	}, [fetchTrainingPlans, user]);

	const redirectEdit = (i) => {
		setToggle({ value: true, index: i });
	};

	const toDeletePlan = (item) => {
		let listToDelete = [];
		const { exercises } = item;
		for (let i = 0; i < exercises.length; i++) {
			listToDelete.push(exercises[i]._id);
		}
		console.log(listToDelete);
		deleteTrainingPlans(listToDelete);
		toast.success('Please Deleted Successfully!!');
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	useEffect(() => {
		if (plans) {
			plans.map((plan, index) => {
				plan.actions = (
					<div>
						<button onClick={() => redirectEdit(index)} className='btn btn-pill btn-primary mb-2' type='button'>
							Edit
						</button>
						<button onClick={() => toDeletePlan(plan)} className='btn btn-pill btn-danger mb-2' type='button'>
							Delete
						</button>
					</div>
				);
			});
			setDatatable({ ...datatable, rows: plans });
		}
	}, [plans]);

	if (toggle.value) {
		return <Redirect to={`training-plans/${toggle.index}`} />;
	}
	return (
		<div className='card'>
			<div className='card-header'>
				<h4>Training Plans</h4>
			</div>
			<div className='card-body'>
				<div className='table-responsive shopping-table text-center'>
					<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
				</div>
			</div>
		</div>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user,
		plans: state.plans.trainingPlans
	}),
	{ fetchTrainingPlans, deleteTrainingPlans }
)(Plans);
