import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import DatePicker from 'react-date-picker';
import { MyProfile, BOD, Bio,MarkJecno,Designer,Password,Website,Save,EditProfile,Company,Username,UsersCountryMenu,AboutMe,UpdateProfile,UsersTableTitle,FirstName,LastName,Address,EmailAddress,PostalCode,Country, UsersTableHeader,City,Edit,Update,Delete, NAME} from '../../constant'
import customerActions from "../../redux/customers/actions"
import { useForm } from 'react-hook-form';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
import { connect } from 'react-redux';
const { fetchSingleCustomer } = customerActions;

const UserEdit = ({fetchSingleCustomer, customer, match} ) => {
    console.log(match.params.id)
    const { register, handleSubmit, errors } = useForm();

    const [formData, setFormData] = useState({
		name: '',
		email: '',
		dateOfBirth: '',
        id: null,
	});

    const { dateOfBirth, email , name } = formData;

    const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

    const dateHandler = (value) => {
		setFormData({ ...formData, dateOfBirth: value });
	};

    const formSubmitHandler = async (e) => {
        console.log(formData)
		const body = JSON.stringify(formData);
        CONFIG.headers.access_token = localStorage.getItem('id_token')
		await axios.put(`${API_URL}/user/update`, body, CONFIG);
	};

    useEffect (()=> {
        fetchSingleCustomer({id:match.params.id});
    },[])

    useEffect (()=> {
        if(customer){
            setFormData(customer)
        }
        
    },[customer])
    
    return (
        <Fragment>
            <Breadcrumb parent="User" title="Edit Profile" />
            <div className="container-fluid">
                <div className="edit-profile">
                    <div className="row">
                        <div className="col-lg-4">

                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{MyProfile}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="img-70 rounded-circle" alt="" src={seven} /></div>
                                            <div className="col">
                                                <h3 className="mb-1">{MarkJecno}</h3>
                                                <p className="mb-4">{Designer}</p>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{NAME}</label>
                                            <input className="form-control" onChange={inputChangeHandler}
												name='name' value= {name} placeholder="your-name" ref={register({ required: true })} />
                                        </div>
                                        <span>{errors.name && 'name is required'}</span>
                                        <div className="form-group">
                                            <label className="form-label">{EmailAddress}</label>
                                            <input className="form-control" onChange={inputChangeHandler}
												name='email' value= {email} placeholder="your-email@domain.com" ref={register({ required: true })} />
                                        </div>
                                        <span>{errors.email && 'email is required'}</span>
                                    <div className='form-group'>
									<label className='col-form-label'>{BOD}</label>
									<div className='form-row'>
										<DatePicker value={dateOfBirth} onChange={dateHandler} />
									</div>
								</div>
                                        <div className="form-footer">
                                            <button className="btn btn-primary btn-block">{Save}</button>
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

export default connect((state) => ({
	customer: state.customerReducer.singleCustomer,
}),{fetchSingleCustomer})(UserEdit);