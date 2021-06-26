import React, { Fragment, useEffect, useState } from 'react';
import Breadcrumb from '../common/breadcrumb';
import { Comment } from '../../constant';
import { API_URL, CONFIG } from '../../services/helper';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import DisplayInitials from '../common/displayInitials';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const BlogSingle = ({ match, user, history }) => {
	const [formData, setFormData] = useState({
		recipe: match.params.id,
		comment: ''
	});
	const [data, setData] = useState();
	const [comment, setComment] = useState();
	const [ratings, setRatings] = useState(0);
	const [shouldDiplay, setShouldDiplay] = useState(false);

	const getComments = async () => {
		const comments = await axios.get(`${API_URL}/recipe/${match.params.id}/comment`, CONFIG);
		setComment(comments.data);
	};

	useEffect(() => {
		async function myAPI() {
			try {
				CONFIG.headers.access_token = localStorage.getItem('id_token');
				const res = await axios.get(`${API_URL}/recipe/${match.params.id}`, CONFIG);
				setData(res.data);
				setRatings(parseInt(res.data.rating));
				getComments();
			} catch (error) {
				console.log(error);
			}
		}
		myAPI();
	}, []);

	useEffect(() => {
		if (data && user && data.user._id === user._id) {
			setShouldDiplay(true);
		}
	}, [data, user]);

	const changeRating = async (newRating, name) => {
		try {
			const body = JSON.stringify({ recipe: match.params.id, rating: newRating });
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			const res = await axios.post(`${API_URL}/recipe/rating`, body, CONFIG);
			setRatings(parseInt(res.data.rating));
		} catch (error) {
			console.log(error);
		}
	};

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const formSubmitHandler = async (e) => {
		try {
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			const body = JSON.stringify(formData);
			const res = await axios.post(`${API_URL}/recipe/comment`, body, CONFIG);
			if (res.status < 300) {
				getComments();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteRecipe = async () => {
		try {
			CONFIG.headers.access_token = localStorage.getItem('id_token');
			await axios.delete(`${API_URL}/recipe/${match.params.id}`, CONFIG);
			history.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Fragment>
			<Breadcrumb title='Recipe' />
			{data && (
				<div className='container-fluid' style={{ backgroundColor: 'white' }}>
					<div className='row'>
						<div className='col-sm-12'>
							<div className='blog-single'>
								<div className='blog-box blog-details'>
									<div style={{ display: 'flex', justifyContent: 'center' }}>
										<img className='img-fluid w-50' src={data.picture} alt='blog-main' />
									</div>
									<div className='blog-details'>
										<ul className='blog-social'>
											<li className='digits'>{moment(data.date).format('LL')}</li>
											<li>
												<i className='icofont icofont-user'></i>
												{data.user.name}
											</li>
											<li style={{ marginLeft: 4 }} className='digits'>
												<StarRatings changeRating={changeRating} rating={ratings} starDimension='15px' starSpacing='2px' />
											</li>
											{shouldDiplay && (
												<li style={{ marginLeft: 4 }} className='digits'>
													<button onClick={deleteRecipe} className='btn btn-pill btn-danger' type='button' style={{ marginRight: 16 }}>
														Delete
													</button>
													<Link to={'/dashboard/recipe/' + data._id} className='btn btn-pill btn-primary' type='button'>
														Update
													</Link>
												</li>
											)}
										</ul>
										<h4>{data.title}</h4>
										<div className='single-blog-content-top'>
											<li>Calories {data.calories}</li>
											<li>Carbs {data.carbs}</li>
											<li>Fats {data.fats}</li>
											<li>Proteins {data.proteins}</li>
											<div style={{ marginTop: 20 }}>{data.body}</div>
										</div>
									</div>
								</div>
								<section className='comment-box'>
									<h4>{Comment}</h4>
									<hr />

									<ul>
										{comment &&
											comment.map((item, index) => (
												<li key={index}>
													<div className='media'>
														{item.user.avatar ? (
															<img className='align-self-center img-70 rounded-circle' alt='' src={item.user.avatar} />
														) : (
															<DisplayInitials classNames='align-self-center' size={70} picID={index + 900} name={item.user.name} />
														)}
														<div className='media-body'>
															<div className='row'>
																<div className='col-md-4'>
																	<h6 className='mt-0'>{item.user.name}</h6>
																</div>
															</div>
															<p>{item.comment}</p>
														</div>
													</div>
												</li>
											))}
									</ul>
								</section>
								<div className='email-wrapper mb-2'>
									<div className='theme-form'>
										<label htmlFor='exampleFormControlTextarea14'>Write Comment</label>
										<textarea
											name='comment'
											onChange={inputChangeHandler}
											className='form-control btn-square'
											id='exampleFormControlTextarea14'
											rows='1'
											cols='50'></textarea>
										<button className='btn btn-primary mt-2' onClick={formSubmitHandler}>
											Post
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default connect(
	(state) => ({
		user: state.authReducer.user
	}),
	null
)(BlogSingle);
