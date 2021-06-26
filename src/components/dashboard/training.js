import React, { Fragment, useEffect, useState } from 'react';
import trainingPlansActions from '../../redux/trainingPlans/actions';
import customerActions from '../../redux/customers/actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';
const { createTrainingPlan, fetchTrainingPlans, deleteTrainingPlans } = trainingPlansActions;
const { fetchCustomers } = customerActions;
const options = [];
const Training = ({
	user,
	createTrainingPlan,
	fetchTrainingPlans,
	fetchCustomers,
	customers,
	trainingPlans,
	match,
	deleteTrainingPlans
}) => {
	const [inputs, setInputs] = useState({ inputs: ['Exercise-1'] });
	const [formData, setFormData] = useState({
		planName: '',
		exercises: [{ set: '', weight: '', exercise: '', repetitions: '', comment: '', _id: '' }]
	});
	const [toDelete, setToDelete] = useState([]);
	const [selectedOption, setSelectedOption] = useState([]);

	useEffect(() => {
		if (trainingPlans && trainingPlans.length && match.params) {
			const myPlan = trainingPlans[match.params.index];
			if (myPlan) {
				const exerciseLabels = [];
				for (let i = 0; i < myPlan.exercises.length; i++) {
					exerciseLabels.push(`Exercise-${i + 1}`);
				}
				setInputs({ inputs: exerciseLabels });
				setFormData(myPlan);
			} else {
				setFormData({ planName: '', exercises: [{ set: '', weight: '', exercise: '', repetitions: '', comment: '', _id: '' }] });
				setInputs({ inputs: ['Exercise-1'] });
			}
		}
	}, [trainingPlans, match.params]);

	useEffect(() => {
		if (user) {
			fetchCustomers();
		}
	}, [user]);

	useEffect(() => {
		if (customers.length && !options.length) {
			for (let i = 0; i < customers.length; i++) {
				const { name, _id, id } = customers[i];
				const customerObj = { value: _id, label: `${name} ${id}` };
				options.push(customerObj);
			}
		}
	}, [customers]);

	const removeExercise = (event, index) => {
		const { exercises } = formData;
		event.preventDefault();
		const deletedId = exercises[index]._id;
		if (deletedId) {
			const toDeletePlans = [...toDelete];
			toDeletePlans.push(deletedId);
			setToDelete(toDeletePlans);
		}
		exercises.splice(index, 1);

		inputs.inputs.splice(index, 1);
		setInputs({ inputs: inputs.inputs });
		setFormData((prevState) => ({ ...prevState, exercises }));
	};

	const addNewExercise = (index, e) => {
		const { exercises } = formData;
		const { name, value } = e.target;
		if (index <= exercises.length - 1) {
			exercises[index][name] = value;
		} else {
			exercises.push({
				name: value
			});
		}
		setFormData({ ...formData, exercises });
	};

	const submitForm = (e) => {
		e.preventDefault();
		const { planName, exercises } = formData;
		if (!planName) {
			toast.error('Please enter plan name!!');
			return;
		}
		if (toDelete.length) {
			deleteTrainingPlans(toDelete);
		}
		if (user.role !== 'customer') {
			const multiPayload = [];
			const mySelectedOptions = [...selectedOption];
			mySelectedOptions.push({ value: user._id });
			console.log(exercises.length, mySelectedOptions, 'here');
			for (let n = 0; n < mySelectedOptions.length; n++) {
				for (let i = 0; i < exercises.length; i++) {
					const body = {};
					body.user = mySelectedOptions[n].value;
					body.planName = planName;
					body.set = exercises[i].set;
					body.weight = exercises[i].weight;
					body.exercise = exercises[i].exercise;
					body.repetitions = exercises[i].repetitions;
					body.comment = exercises[i].comment;
					if (exercises[i]._id) {
						body._id = exercises[i]._id;
					}
					multiPayload.push(body);
				}
			}
			createTrainingPlan(multiPayload);
			toast.success('Plan has been added!!');
		} else {
			const payload = [];
			for (let i = 0; i < exercises.length; i++) {
				const body = {};
				if (exercises[i]._id) {
					body._id = exercises[i]._id;
				}
				body.user = user._id;
				body.planName = planName;
				body.set = exercises[i].set;
				body.weight = exercises[i].weight;
				body.exercise = exercises[i].exercise;
				body.repetitions = exercises[i].repetitions;
				body.comment = exercises[i].comment;
				payload.push(body);
			}
			createTrainingPlan(payload);
			toast.success('Plan has been added!!');
		}
	};

	const appendInput = () => {
		var newInput = `Exercise-${inputs.inputs.length + 1}`;
		setInputs((prevState) => ({ inputs: prevState.inputs.concat([newInput]) }));
	};

	const handleChange = (selectedOption) => {
		setSelectedOption(selectedOption);
	};

	const { exercises, planName } = formData;

	return (
		<div className='container-fluid'>
			<div className='edit-profile'>
				<div className='row'>
					<div className='col-lg-2 col-md-2'></div>
					<div className='col-lg-8 col-md-8'>
						<div className='card'>
							<div className='card-header'>
								<h4 className='card-title mb-0'>{`Make a plan`}</h4>
								<div className='card-options'>
									<a className='card-options-collapse' href='javascript' data-toggle='card-collapse'>
										<i className='fe fe-chevron-up'></i>
									</a>
									<a className='card-options-remove' href='javascript' data-toggle='card-remove'>
										<i className='fe fe-x'></i>
									</a>
								</div>
							</div>
							<div className='card-body'>
								<form className='theme-form'>
									<label className='col-form-label pt-0'>Training Plan Name</label>
									<div className='form-group'>
										<input
											value={planName}
											onChange={(e) => setFormData((prevState) => ({ ...prevState, planName: e.target.value }))}
											required
											className='form-control'
											type='text'
											name='planName'
											placeholder='sets'
										/>
									</div>

									{user && user.role !== 'customer' && (
										<div className='mt-2 mb-2'>
											<label className='col-form-label pt-0'>Customer</label>
											<Select isMulti value={selectedOption} onChange={handleChange} options={options} />
										</div>
									)}
									{inputs.inputs.map((input, index) => {
										return (
											<Fragment className={'mb-2'} key={input + index}>
												<label style={{ float: 'left' }} className='col-form-label pt-0'>
													{input}
												</label>
												{index !== 0 && (
													<label onClick={(e) => removeExercise(e, index)} style={{ float: 'right' }} className='col-form-label pt-0'>
														X
													</label>
												)}
												<div className='form-group'>
													<input
														onChange={(e) => addNewExercise(index, e)}
														required
														value={exercises[index] && exercises[index].exercise}
														className='form-control'
														type='text'
														name='exercise'
														placeholder='Exercise Name'
													/>
												</div>
												<div className='form-group'>
													<input
														onChange={(e) => addNewExercise(index, e)}
														required
														value={exercises[index] && exercises[index].set}
														className='form-control'
														type='text'
														name='set'
														placeholder='sets'
													/>
												</div>
												<div className='form-group'>
													<input
														onChange={(e) => addNewExercise(index, e)}
														required
														value={exercises[index] && exercises[index].weight}
														className='form-control'
														type='text'
														name='weight'
														placeholder='weights'
													/>
												</div>
												<div className='form-group'>
													<input
														onChange={(e) => addNewExercise(index, e)}
														required
														className='form-control'
														type='text'
														value={exercises[index] && exercises[index].repetitions}
														name='repetitions'
														placeholder='Repetitions'
													/>
												</div>
												<div className='form-group'>
													<input
														onChange={(e) => addNewExercise(index, e)}
														required
														className='form-control'
														type='text'
														value={exercises[index] && exercises[index].comment}
														name='comment'
														placeholder='Comments'
													/>
												</div>
											</Fragment>
										);
									})}
									<button className='btn btn-pill btn-primary mb-2' type='button' onClick={submitForm}>
										Submit Training Plan
									</button>
								</form>
								<button className='btn btn-pill btn-primary mb-2' type='button' onClick={appendInput}>
									Click To Add Exercise
								</button>
							</div>
						</div>
					</div>

					<div className='col-lg-4'></div>
				</div>
			</div>
		</div>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user,
		customers: state.customerReducer.customers,
		trainingPlans: state.plans.trainingPlans
	}),
	{ createTrainingPlan, fetchTrainingPlans, fetchCustomers, deleteTrainingPlans }
)(Training);
