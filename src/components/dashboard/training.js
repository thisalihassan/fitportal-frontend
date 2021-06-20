import React, { Fragment, useEffect, useState } from 'react';
import trainingPlansActions from '../../redux/trainingPlans/actions';
import { connect } from 'react-redux';
import Select from 'react-select';
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

		<div className="container-fluid">
                <div className="edit-profile">
                    <div className="row">
                    <div className="col-lg-2 col-md-2"></div>
                        <div className="col-lg-8 col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{`Make a plan`}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
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

				<div className="mt-2 mb-2">
				<label className='col-form-label pt-0'>Customer</label>
				<Select isMulti />
				</div>
				{inputs.inputs.map((input, index) => {
					return (
						<Fragment className= {'mb-2'} key={input + index}>
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
				<button className='btn btn-pill btn-primary mb-2' type='button' onClick={submitForm}>Submit Training Plan</button>
			</form>
			<button className='btn btn-pill btn-primary mb-2' type='button' onClick={appendInput}>Click To Add Exercise</button>

                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">

                        </div>
                    </div>
                </div>
            </div>
       

		// <div className={'container-fluid p-0'}>
			
		
		// </div>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user
	}),
	{ createTrainingPlan, fetchTrainingPlans }
)(Training);
