import React, { Fragment,useState,useEffect } from 'react';
import Breadcrumb from '../common/breadcrumb';
import seven from '../../assets/images/user/7.jpg';
import DatePicker from 'react-date-picker';
import {  BOD, Save,EmailAddress, NAME, Phone} from '../../constant'
import customerActions from "../../redux/customers/actions"
import { useForm } from 'react-hook-form';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
import { connect } from 'react-redux';
import { MDBContainer,  MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from "mdbreact";
import UserWeights from '../weights/userWeights'
const { fetchSingleCustomer } = customerActions;

const UserEdit = ({fetchSingleCustomer, customer, match} ) => {
    const { register, handleSubmit, errors } = useForm();
    const [activeItem, setActiveItem] = useState("1");
    const [formData, setFormData] = useState({
		name: '',
		email: '',
		dateOfBirth: '',
        id: null,
        phone: '',
        address: ''
	});
    const toggle  = (tab) => {
        if (activeItem !== tab) {
        setActiveItem(tab)
        }
      }
    const { dateOfBirth, email , name, phone, address } = formData;

    const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

    const dateHandler = (value) => {
		setFormData({ ...formData, dateOfBirth: value });
	};

    const formSubmitHandler = async (e) => {
		const body = JSON.stringify(formData);
        CONFIG.headers.access_token = localStorage.getItem('id_token')
		const response = await axios.put(`${API_URL}/user/update`, body, CONFIG);
        if(response.status < 300) {
            window.location.reload();
        }
	};

    useEffect (()=> {
        fetchSingleCustomer({id:match.params.id});
    },[fetchSingleCustomer, match.params.id])

    useEffect (()=> {
        if(customer){
            setFormData(customer)
        }
        
    },[customer])
    
    return (
        <Fragment>
            <Breadcrumb parent="User" title="Edit Profile" />

            {/* <MDBContainer>
          <MDBNav tabs>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={activeItem === "1"}
              onClick={()=> toggle("1")}
              role="tab"
            >
              <MDBIcon icon="user" /> Profile
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={activeItem === "2"}
              onClick={()=> toggle("2")}
              role="tab"
            >
              <MDBIcon icon="heart" /> Weights
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink
              link
              to="#"
              active={activeItem === "3"}
              onClick={()=> toggle("3")}
              role="tab"
            >
              <MDBIcon icon="envelope" /> Contact
            </MDBNavLink>
          </MDBNavItem>
        </MDBNav>
        <MDBTabContent
          className="card"
          activeItem={activeItem}
        >
          <MDBTabPane tabId="1" role="tabpanel">
          <div className="container-fluid">
                <div className="edit-profile">
                    <div className="row">
                        <div className="col-lg-4">

                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title mb-0">{`${name}'s Profile`}</h4>
                                    <div className="card-options">
                                        <a className="card-options-collapse" href="javascript" data-toggle="card-collapse"><i className="fe fe-chevron-up"></i></a><a className="card-options-remove" href="javascript" data-toggle="card-remove"><i className="fe fe-x"></i></a></div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(formSubmitHandler)}>
                                        <div className="row mb-2">
                                            <div className="col-auto"><img className="img-70 rounded-circle" alt="" src={seven} /></div>
                                            <div className="col">
                                                <h3 className="mb-1">{name}</h3>
                                                <p className="mb-4">{customer && customer.role}</p>
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
                                        <div className="form-group">
                                            <label className="form-label">{Phone}</label>
                                            <input className="form-control" onChange={inputChangeHandler}
												name='phone' value= {phone} placeholder="your-phone" ref={register({ required: true })} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Address</label>
                                            <input className="form-control" onChange={inputChangeHandler}
												name='address' value= {address} placeholder="your-address" ref={register({ required: true })} />
                                        </div>
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
        
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            <p className="mt-2">
              <UserWeights userId = {match.params.id}/>
            </p>
          </MDBTabPane>
          <MDBTabPane tabId="3" role="tabpanel">
            <p className="mt-2">
              Etsy mixtape wayfarers, ethical wes anderson tofu before
              they sold out mcsweeney's organic lomo retro fanny pack
              lo-fi farm-to-table readymade. Messenger bag gentrify
              pitchfork tattooed craft beer, iphone skateboard locavore
              carles etsy salvia banksy hoodie helvetica. DIY synth PBR
              banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
              Williamsburg banh mi whatever gluten-free, carles pitchfork
              biodiesel fixie etsy retro mlkshk vice blog. Scenester cred
              you probably haven't heard of them, vinyl craft beer blog
              stumptown. Pitchfork sustainable tofu synth chambray yr.
            </p>
          </MDBTabPane>
        </MDBTabContent>
      </MDBContainer> */}

            </Fragment>
    );
};

export default connect((state) => ({
	customer: state.customerReducer.singleCustomer,
}),{fetchSingleCustomer})(UserEdit);