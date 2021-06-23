const actions = {
	FETCH_TRAINING_PLANS: 'FETCH_TRAINING_PLANS',
	FETCH_TRAINING_PLANS_SUCCESS: 'FETCH_TRAINING_PLANS_SUCCESS',
	POST_TRAINING_PLAN: 'POST_TRAINING_PLAN',
	POST_TRAINING_PLAN_SUCCESS: 'POST_TRAINING_PLAN_SUCCESS',
	DELETE_TRAINING_PLAN: 'DELETE_TRAINING_PLAN',
	deleteTrainingPlans: (payload) => ({
		type: actions.DELETE_TRAINING_PLAN,
		payload
	}),
	fetchTrainingPlans: (payload) => ({
		type: actions.FETCH_TRAINING_PLANS,
		payload
	}),
	fetchTrainingPlansSuccess: (payload) => ({
		type: actions.FETCH_TRAINING_PLANS_SUCCESS,
		payload
	}),

	createTrainingPlan: (payload) => ({
		type: actions.POST_TRAINING_PLAN,
		payload
	})
};
export default actions;
