import React, { Fragment } from 'react';
import Breadcrumb from "../common/breadcrumb";
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import CKEditors from "react-ckeditor-component";
import Dropzone from 'react-dropzone-uploader'
import {PostEdit,Title,Type,Category,Content,Post,Text,Audio,Video,Image} from "../../constant";
import { useForm } from 'react-hook-form';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';

const BlogPost = () => {
    const { register, handleSubmit, errors } = useForm();
	const [formData, setFormData] = React.useState({
		title: '',
		body: '',
	});
    const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
    const formSubmitHandler = async (e) => {
        CONFIG.headers.access_token = localStorage.getItem('id_token')
		const body = JSON.stringify(formData);
		await axios.post(`${API_URL}/recipe`, body, CONFIG);
	};
    return (
        <Fragment>
            <Breadcrumb title="Add Recipe" parent="Recipe" />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5>Add Recipe</h5>
                            </div>
                            <div className="card-body add-post">
                                <form className="row needs-validation" onSubmit={handleSubmit(formSubmitHandler)} noValidate="">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="validationCustom01">{Title}:</label>
                                            <input onChange={inputChangeHandler} className="form-control" id="validationCustom01"  name="title" type="text" placeholder="Post Title" required="" ref={register({ required: true })} />
                                            <div className="valid-feedback">{"Looks good!"}</div>
                                        </div>
                                    
                                        <div className="email-wrapper mb-2">
                                            <div className="theme-form">
                                                <label htmlFor="exampleFormControlTextarea14">Body:</label>
                                                <textarea onChange={inputChangeHandler} name={"body"} ref={register({ required: true })} className="form-control btn-square" id="exampleFormControlTextarea14" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-showcase">
                                    <button className="btn btn-primary" type="submit">{Post}</button>
                                    <input className="btn btn-light" type="reset" value="Discard" />
                                </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BlogPost;