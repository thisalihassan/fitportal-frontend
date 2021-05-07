import React, { Fragment, useEffect, useState } from 'react';
import trainingPlansActions from '../../redux/trainingPlans/actions';
import { connect } from 'react-redux';
const { createTrainingPlan, fetchTrainingPlans } = trainingPlansActions;

const Training = ({ user, createTrainingPlan, fetchTrainingPlans }) => {
	const [inputs, setInputs] = useState({ inputs: ['Exercise-1'] });
	const [formData, setFormData] = useState({
		planName: '',
		exercises: [{ set: '', weight: '', exercise: '', repetitions: '', comment: '', id: '' }]
	});

	useEffect(() => {
		if (user) {
			console.log(user._id);
			fetchTrainingPlans(user._id);
		}
	}, [fetchTrainingPlans, user]);

	const removeExercise = (event, index) => {
		const { exercises } = formData;
		event.preventDefault();
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

	const submitForm = () => {
		const { planName, exercises } = formData;
		const payload = [];

		for (let i = 0; i < exercises.length; i++) {
			const body = {};
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
	};

	const appendInput = () => {
		var newInput = `Exercise-${inputs.inputs.length + 1}`;
		setInputs((prevState) => ({ inputs: prevState.inputs.concat([newInput]) }));
	};

	const { exercises } = formData;

	return (
		<div className={'container-fluid p-0'}>
			<form className='theme-form'>
				<label className='col-form-label pt-0'>Training Plan Name</label>
				<div className='form-group'>
					<input
						onChange={(e) => setFormData((prevState) => ({ ...prevState, planName: e.target.value }))}
						required
						className='form-control'
						type='text'
						name='planName'
						placeholder='sets'
					/>
				</div>
				{inputs.inputs.map((input, index) => {
					return (
						<Fragment key={input + index}>
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
								<input
									onChange={(e) => addNewExercise(index, e)}
									required
									value={exercises[index] && exercises[index].set}
									className='form-control'
									type='text'
									name='set'
									placeholder='sets'
								/>
								<input
									onChange={(e) => addNewExercise(index, e)}
									required
									value={exercises[index] && exercises[index].weight}
									className='form-control'
									type='text'
									name='weight'
									placeholder='weights'
								/>
								<input
									onChange={(e) => addNewExercise(index, e)}
									required
									className='form-control'
									type='text'
									value={exercises[index] && exercises[index].repetitions}
									name='repetitions'
									placeholder='Repetitions'
								/>
								<input
									onChange={(e) => addNewExercise(index, e)}
									required
									className='form-control'
									type='comments'
									value={exercises[index] && exercises[index].comment}
									name='comment'
									placeholder='comments'
								/>
							</div>
						</Fragment>
					);
				})}
				<span onClick={submitForm}>Submit Training Plan</span>
			</form>

			<button onClick={appendInput}>CLICK ME TO ADD AN INPUT</button>
		</div>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user
	}),
	{ createTrainingPlan, fetchTrainingPlans }
)(Training);
