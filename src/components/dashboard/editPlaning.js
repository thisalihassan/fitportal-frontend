import React, { Fragment, useEffect, useState } from 'react';
import trainingPlansActions from '../../redux/trainingPlans/actions';
import { connect } from 'react-redux';
import { MDBDataTableV5 } from 'mdbreact';

const { fetchTrainingPlans } = trainingPlansActions;

const EditPlans = ({user, plans, fetchTrainingPlans, match}) => {
    const [plan, setPlan] = useState()
	useEffect(() => {
		if (user) {
			fetchTrainingPlans(user._id);
		}
	}, [fetchTrainingPlans, user]);
    
    useEffect(() => {
		if (plans && plans.length) {
			setPlan(plans[match.params.index])
		}
	}, [plans]);

    
    return (
        <div className={'container-fluid p-0'}>
            {plan && 
                <form className='theme-form'>
				<label className='col-form-label pt-0'></label>
				<div className='form-group'>
                    <label style={{ float: 'left' }} className='col-form-label pt-0'>
                            {`Plan name`}
                    </label>
					<input
						// onChange={(e) => setFormData((prevState) => ({ ...prevState, planName: e.target.value }))}
						required
						className='form-control'
						type='text'
						name='planName'
						placeholder='sets'
                        value={plan.planName}
					/>
				</div>
				{plan.exercises.map((input, index) => {
					return (
						<Fragment key={input + index}>
							<label style={{ float: 'left' }} className='col-form-label pt-0 mt-5'>
								{`Exercise-${index}`}
							</label>
							{index !== 0 && (
								<label style={{ float: 'right' }} className='col-form-label pt-0'>
									X
								</label>
							)}
							<div className='form-group'>
								<input
									// onChange={(e) => addNewExercise(index, e)}
									required
									value={input.exercise}
									className='form-control'
									type='text'
									name='exercise'
									placeholder='Exercise Name'
								/>
								<input
									// onChange={(e) => addNewExercise(index, e)}
									required
									value={input.set}
									className='form-control'
									type='text'
									name='set'
									placeholder='sets'
								/>
								<input
									// onChange={(e) => addNewExercise(index, e)}
									required
									value={input.weight}
									className='form-control'
									type='text'
									name='weight'
									placeholder='weights'
								/>
								<input
									// onChange={(e) => addNewExercise(index, e)}
									required
									className='form-control'
									type='text'
									value={input.repetitions}
									name='repetitions'
									placeholder='Repetitions'
								/>
								<input
									// onChange={(e) => addNewExercise(index, e)}
									required
									className='form-control'
									type='comments'
									value={input.comment}
									name='comment'
									placeholder='comments'
								/>
							</div>
                            <button onClick={""} className="btn btn-pill btn-danger mb-2" type="button">Update</button>
               
						</Fragment>
					);
				})}
			</form>

            }
    </div>
		
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user,
        plans: state.plans.trainingPlans
	}),
	{ fetchTrainingPlans }
)(EditPlans);

