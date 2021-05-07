import React ,{Fragment ,useEffect} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import customerActions from "../../redux/customers/actions"
import axios from 'axios';
import { API_URL, CONFIG } from '../../services/helper';
import DatePicker from 'react-date-picker';

const Stats = () => {
    const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: 'Price',
            field: 'price',
            width: 150,
            attributes: {
              'aria-controls': 'DataTable',
              'aria-label': 'Name',
            },
          },
          {
            label: 'Due Date',
            field: 'dueDate',
            width: 270,
          },
          {
            label: 'Who',
            field: 'name',
            width: 270,
          },
    
        ],
      })
      const [formData, setFormData] = React.useState({
		from: '',
		to: ''
	});
      const dateHandler = (value) => {
		setFormData({ ...formData, from: value });
	};
    const toDateHandler = (value) => {
		setFormData({ ...formData, to: value });
	};
    return (
    <Fragment>
       <Breadcrumb  parent = "Dashboard"   title = "Invoice Manager"  />
       <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 xl-50">
              <div className="card">
                <div className="card-header">
                  <h4>Filters</h4>
                </div>
                <div className="card-body">
                    <div className={"row"}>
                        <div className={"col-md-4"}>
                            <div className='form-group'>
                                <label className='col-form-label'>From</label>
                                <div className='form-row'>
                                    <DatePicker value={formData.from} onChange={dateHandler} />
                                </div>
                            </div>
                        </div>                     
                        <div className={"col-md-4"}>
                            <div className='form-group'>
                                <label className='col-form-label'>To:</label>
                                <div className='form-row'>
                                    <DatePicker value={formData.to} onChange={toDateHandler} />
                                </div>
                            </div>
                        </div>
                        <div className={"col-md-4"}>
                            <button className='btn btn-primary mt-4' type='submit'>
                                Search
                            </button>
                        </div>
                    </div> 
                    
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-xl-4 xl-50">
                <div class="card" style={{"width": "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title ml-5">Invoices</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-xl-4 xl-50">
                <div class="card" style={{"width": "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title ml-5">Expenses</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-xl-4 xl-50">
                <div class="card" style={{"width": "18rem"}}>
                    <div class="card-body">
                        <h5 class="card-title ml-5">Net Profit</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default Stats;