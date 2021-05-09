import React, { Fragment, useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import fourteen from '../../assets/images/blog/14.png';
import { Comment } from '../../constant';
import { API_URL, CONFIG } from '../../services/helper';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
const BlogSingle = ({ match }) => {
	const [formData, setFormData] = React.useState({
		recipe: match.params.id,
		comment: ''
	});
	const [data, setData] = React.useState();
	const [comment, setComment] = React.useState();

	useEffect(() => {
		async function myAPI() {
			try {
				CONFIG.headers.access_token = localStorage.getItem('id_token');
				const res = await axios.get(`${API_URL}/recipe/${match.params.id}`, CONFIG);
				setData(res.data);

				const comments = await axios.get(`${API_URL}/recipe/${match.params.id}/comment`, CONFIG);
				setComment(comments.data);
			} catch (error) {
				console.log(error);
			}
		}
		myAPI();
	}, []);
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const formSubmitHandler = async (e) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const body = JSON.stringify(formData);
		const res = await axios.post(`${API_URL}/recipe/comment`, body, CONFIG);
		if (res.status < 300) {
			window.location.reload();
		}
	};

	return (
		<Fragment>
			<Breadcrumb title='Recipe' />
			{data && (
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-sm-12'>
							<div className='blog-single'>
								<div className='blog-box blog-details'>
									<div className='blog-details'>
										<ul className='blog-social'>
											<li className='digits'>{data.date}</li>
											<li>
												<i className='icofont icofont-user'></i>
												{data.user.name}
											</li>
											<li style={{ marginLeft: 4 }} className='digits'>
												<StarRatings rating={2.403} starDimension='15px' starSpacing='2px' />
											</li>
										</ul>
										<h4>{data.title}</h4>
										<div className='single-blog-content-top'>{data.body}</div>
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
														<img className='align-self-center' src={fourteen} alt='Generic placeholder' />
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
											name={'comment'}
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

export default BlogSingle;
