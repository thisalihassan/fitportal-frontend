import React ,{Fragment ,useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import customerActions from "../../redux/customers/actions"
import axios from 'axios';
import { API_URL, CONFIG } from '../../services/helper';
import { connect } from 'react-redux';
const { fetchCustomers } = customerActions;

const Training = () => {
    const [inputs, setInputs] = useState({ inputs: ['Day-1'] })

    const appendInput = () => {
        var newInput = `Day-${inputs.inputs.length+1}`;
        setInputs(prevState => ({ inputs: prevState.inputs.concat([newInput]) }));
    }
    return (
        <div className= {'container-fluid p-0'}>
            <form className='theme-form'>
            {inputs.inputs.map(input => {
                return (
                    <>
                        <label className='col-form-label pt-0'>{input}</label>
                        <div className='form-group'>
                        <input
                            className='form-control'
                            type='text'
                            name={`${input}-sets`}
                            placeholder='sets'
                        />
                        <input
                            className='form-control'
                            type='text'
                            name={`${input}-weights`}
                            placeholder='weights'
                        />
                        <input
                            className='form-control'
                            type='comments'
                            name={`${input}-comments`}
                            placeholder='comments'
                        />
                    </div>
                    </>
                    
                )
            })}
                
                
            </form>
											
            <button onClick={ appendInput }>
                CLICK ME TO ADD AN INPUT
            </button>
        </div>
  );
};

export default Training;