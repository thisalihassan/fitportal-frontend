const actions = {
	FETCH_TRAINING_PLANS: 'FETCH_TRAINING_PLANS',
	FETCH_TRAINING_PLANS_SUCCESS: 'FETCH_TRAINING_PLANS_SUCCESS',
	POST_TRAINING_PLAN: 'POST_TRAINING_PLAN',
	POST_TRAINING_PLAN_SUCCESS: 'POST_TRAINING_PLAN_SUCCESS',

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
