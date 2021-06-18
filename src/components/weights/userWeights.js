import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import customerActions from '../../redux/customers/actions';

import {Modal, Button} from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import moment from 'moment';
import { API_URL, CONFIG } from '../../services/helper';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
const { fetchCustomerWeight } = customerActions;
const UserWeights = ({ fetchCustomerWeight, weights, userId }) => {
	const [modal, setModal] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [weight, setWeight] = useState();
	const [labels, setLabels] = useState([]);
	const [datasets, setDataset] = useState({
		label: 'Daily Weights',
		data: [],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	});
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
					'aria-label': 'Name'
				}
			},
			{
				label: 'Weight',
				field: 'weight',
				width: 270
			},
			{
				label: 'Actions',
				field: 'actions',
				width: 270
			}
		]
	});
	useEffect(() => {
		fetchCustomerWeight({ id: userId });
	}, []);

	useEffect(() => {
		if (weights) {
			const labels = [];
			const data = [];
			for (var i = 0; i < weights.length; i++) {
				const id = weights[i]._id;
				labels.push(weights[i].date);
				data.push(weights[i].weight);
				setDataset((prevState) => ({ ...prevState, data }));
				setLabels(labels);
				weights[i].date = moment(weights[i].date).format("LL")
				weights[i].actions = (
					<div>
						<button onClick={() => toggleEdit(id)} className='btn btn-pill btn-primary mb-2' type='button'>
							Edit
						</button>
						<button onClick={() => deleteWeight(id)} className='btn btn-pill btn-danger mb-2' type='button'>
							Delete
						</button>
					</div>
				);
			}
			setDatatable({ ...datatable, rows: weights });
		}
	}, [weights]);

	const inputChangeHandler = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const weightChangeHandler = (e) => {
		const { name, value } = e.target;
		setWeight({ ...weight, [name]: value });
	};

	const toggle = () => {
		setModal(!modal);
	};

	const toggleEdit = async (id) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const response = await axios.get(`${API_URL}/weight/${id}`, CONFIG);
		setWeight(response.data);
		setEditModal(!modal);
	};
	var d = new Date();

	const modalSubmitHandler = async (e) => {
		const body = JSON.stringify(formData);
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const response = await axios.post(`${API_URL}/weight`, body, CONFIG);
		if (response.status < 300) {
			window.location.reload();
		}
	};

	const editModalSubmitHandler = async (e) => {
		const body = JSON.stringify(weight);
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const response = await axios.put(`${API_URL}/weight/update/${weight._id}`, body, CONFIG);
		if (response.status < 300) {
			window.location.reload();
		}
	};
	const deleteWeight = async (id) => {
		CONFIG.headers.access_token = localStorage.getItem('id_token');
		const response = await axios.delete(`${API_URL}/weight/${id}`, CONFIG);
		if (response.status < 300) {
			window.location.reload();
		}
	};

	return (
		<div style={{ padding: '10px', height: '100vh' }}>
			<button  style={{ marginLeft: 20 }} color='primary' className='btn btn-pill' onClick={toggle}>
				Add Weight
			</button>
			<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
			{datasets.data.length > 0 && <Line data={{ labels: labels, datasets: [datasets] }} />}
			
			<Modal
        show={modal}
        onHide={toggle}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Daily Weights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<br></br>
			<span>Date: {`${d.getDate() + 1}-${d.getMonth()}-${d.getFullYear()}`}</span>
			<br></br>
			<div className='form-group'>
				<label className='form-label'>Weight (in kGs)</label>
				<input
					className='form-control'
					onChange={inputChangeHandler}
					name='weight'
					value={formData.weight}
					placeholder='Enter weight in kgs'
				/>
			</div>		
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={modalSubmitHandler}>Add</Button>
        </Modal.Footer>
      </Modal>
			
			
			

			{/* updateModal */}

			<Modal
        show={editModal}
        onHide={() => setEditModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Daily Weights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<br></br>
			<span>Date: {weight && weight.date}</span>
			<br></br>
			<div className='form-group'>
				<label className='form-label'>Weight (in kGs)</label>
				<input
					className='form-control'
					onChange={weightChangeHandler}
					name='weight'
					value={weight && weight.weight}
					placeholder='Enter weight in kgs'
				/>
			</div>		
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={editModalSubmitHandler}>Add</Button>
        </Modal.Footer>
      </Modal>

		</div>
	);
};

export default connect(
	(state) => ({
		weights: state.customerReducer.customerWeights
	}),
	{ fetchCustomerWeight }
)(UserWeights);
