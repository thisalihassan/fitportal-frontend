import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import customerActions from '../../redux/customers/actions';
import { MDBDataTableV5 } from 'mdbreact';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
import { connect } from 'react-redux';
const {fetchCustomerWeight } = customerActions;
const UserWeights = ({ fetchCustomerWeight, weights, userId }) => {
  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [formData, setFormData] = useState({
		weight: 0,
    user: userId
	});
	const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: 'Date',
            field: 'date',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            },
          },
          {
            label: 'Weight',
            field: 'weight',
            width: 270,
          },
          {
            label: 'Actions',
            field: 'actions',
            width: 270,
          },
    
        ],
      })
    useEffect(()=> {
        fetchCustomerWeight({id: userId});
    }, [])
    useEffect(()=> {
        if(weights){
          for (var i=0; i< weights.length; i++) {
              const id = weights[i]._id
              weights[i].actions = <div>
              <button onClick= {()=> toggleEdit(id)} className="btn btn-pill btn-primary mb-2" type="button">Edit</button>
              <button onClick={ ""} className="btn btn-pill btn-danger mb-2" type="button">Delete</button>
            </div>
          }
          setDatatable({...datatable, rows: weights})
        }
    },[weights])
    const inputChangeHandler = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    const toggle = () => {
      setModal(!modal);
    }

    const toggleEdit =  async (id) => {
      CONFIG.headers.access_token = localStorage.getItem('id_token')
      const response = await axios.get(`${API_URL}/weight/user-weights/${id}`, CONFIG);
      console.log(response)    
      // setEditModalModal(!modal);
    }
    var d = new Date();

    const modalSubmitHandler = async (e) => {
      
      const body = JSON.stringify(formData);
      CONFIG.headers.access_token = localStorage.getItem('id_token')
      const response = await axios.post(`${API_URL}/weight`, body, CONFIG);
          if(response.status < 300) {
              window.location.reload();
          }
    };
	return (
    
		<div style= {{padding: '10px'}}>
      <MDBBtn color="primary" onClick={toggle}>Add Weight</MDBBtn>
      <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
    
      <MDBContainer>
      <MDBBtn onClick={toggle}>Modal</MDBBtn>
      <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Add Daily Weights</MDBModalHeader>
        <MDBModalBody>
          <span>Date: {`${d.getDate()+1}-${d.getMonth()}-${d.getFullYear()}` }</span>
          <br></br>
          <div className="form-group">
            <label className="form-label">Weight (in kGs)</label>
            <input className="form-control" onChange={inputChangeHandler}
            name='weight' value= {formData.weight} placeholder="Enter weight in kgs"/>
          </div>

        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary" onClick={modalSubmitHandler}>Add</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    </div>
	);
};

export default 	connect((state) => ({
    weights: state.customerReducer.customerWeights
}),
{ fetchCustomerWeight })
(UserWeights);
