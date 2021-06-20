import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Title, Post } from '../../constant';
import { useForm } from 'react-hook-form';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';

const BlogPost = ({ history }) => {
	const { register, handleSubmit } = useForm();
	const [formData, setFormData] = React.useState({
		title: '',
		body: '',
		calories: '',
		fats: '',
		proteins: '',
		carbs: ''
	});
	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const formSubmitHandler = async (e) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const body = JSON.stringify(formData);
		await axios.post(`${API_URL}/recipe`, body, CONFIG);
		history.push('/');
	};
	return (
		<Fragment>
			<Breadcrumb title='Add Recipe' parent='Recipe' />
			<div className="container-fluid">
                <div className="edit-profile">
                    <div className="row">
                    <div className="col-lg-2 col-md-2"></div>
                        <div className="col-lg-8 col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{`Add Recipe `}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                                        <div className="row mb-2 ml-2">
                                            {/* <div className="col-auto">{avatar ? <img className="img-70 rounded-circle" alt="" src={avatar} />: <DisplayInitials size={70} picID={3} name={name} />}</div> */}
                                            <input
                                                // onChange={inputChangeHandler}
                                                type="file" id="avatar" name="avatar" accept="image/*"
                                            />
                                        </div>
                                        <div className='form-group'>
											<label htmlFor='validationCustom01'>{Title}:</label>
											<input
												onChange={inputChangeHandler}
												className='form-control'
												id='validationCustom01'
												name='title'
												type='text'
												placeholder='Post Title'
												required=''
												ref={register({ required: true })}
											/>
											<div className='valid-feedback'>{'Looks good!'}</div>
										</div>
                                        {/* <span>{errors.name && 'name is required'}</span> */}
										
										<div className='form-group'>
											<label htmlFor='validationCustom01'>Calories :</label>
											<input
												onChange={inputChangeHandler}
												className='form-control'
												id='validationCustom01'
												name='calories'
												type='text'
												placeholder='number of calories'
												required=''
												ref={register({ required: true })}
											/>
											<div className='valid-feedback'>{'Looks good!'}</div>
										</div>
                                        {/* <span>{errors.name && 'name is required'}</span> */}

										<div className='form-group'>
											<label htmlFor='validationCustom01'>Carbs :</label>
											<input
												onChange={inputChangeHandler}
												className='form-control'
												id='validationCustom01'
												name='carbs'
												type='text'
												placeholder='number of carbs'
												required=''
												ref={register({ required: true })}
											/>
											<div className='valid-feedback'>{'Looks good!'}</div>
										</div>
                                        {/* <span>{errors.name && 'name is required'}</span> */}

										<div className='form-group'>
											<label htmlFor='validationCustom01'>fats :</label>
											<input
												onChange={inputChangeHandler}
												className='form-control'
												id='validationCustom01'
												name='fats'
												type='text'
												placeholder='number of fats'
												required=''
												ref={register({ required: true })}
											/>
											<div className='valid-feedback'>{'Looks good!'}</div>
										</div>
                                        {/* <span>{errors.name && 'name is required'}</span> */}

										<div className='form-group'>
											<label htmlFor='validationCustom01'>Proteins :</label>
											<input
												onChange={inputChangeHandler}
												className='form-control'
												id='validationCustom01'
												name='proteins'
												type='text'
												placeholder='number of proteins'
												required=''
												ref={register({ required: true })}
											/>
											<div className='valid-feedback'>{'Looks good!'}</div>
										</div>
                                        {/* <span>{errors.name && 'name is required'}</span> */}
                                        <div className="form-group">
											<div className='theme-form'>
												<label htmlFor='exampleFormControlTextarea14'>Body:</label>
												<textarea
													onChange={inputChangeHandler}
													name={'body'}
													ref={register({ required: true })}
													className='form-control btn-square'
													id='exampleFormControlTextarea14'
													rows='3'></textarea>
											</div>
										</div>
								<div className='btn-showcase'>
										<button className='btn btn-primary' type='submit'>
											{Post}
										</button>
										<input className='btn btn-light' type='reset' value='Discard' />
									</div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">

                        </div>
                    </div>
                </div>
            </div>
       
		</Fragment>
	);
};

export default BlogPost;
