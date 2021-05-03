import React ,{Fragment ,useEffect} from 'react';
import Breadcrumb from '../common/breadcrumb';
import { MDBDataTableV5 } from 'mdbreact';
import customerActions from "../../redux/customers/actions"

import { connect } from 'react-redux';
const { fetchCustomers } = customerActions;

const Ecommerce = ({fetchCustomers, customers}) => {
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'DOB',
        field: 'dateOfBirth',
        width: 270,
      },
      {
        label: 'Actions',
        field: 'actions',
        width: 270,
      },

    ],
  })

  useEffect (()=> {
    fetchCustomers();
  }, [])
  useEffect (()=> {
   if(customers){
     for (var i=0; i< customers.length; i++) {
       customers[i].actions = <div>
         <a href= {`http://localhost:3000/endless/users/userEdit/${customers[0]._id}`} className="btn btn-pill btn-primary mb-2" type="button">Edit</a>
         <button className="btn btn-pill btn-danger mb-2" type="button">Delete</button>
       </div>
     }
     setDatatable({...datatable, rows: customers})
   } 
  }, [customers])
  console.log(customers)
  return (
    <Fragment>
       <Breadcrumb  parent = "Dashboard"   title = "Ecommerce"  />
       <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 xl-50">
              <div className="card">
                <div className="card-header">
                  <h4>Customers</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive shopping-table text-center">
                  <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Fragment>
  );
};

export default connect((state) => ({
	customers: state.customerReducer.customers,
}),{fetchCustomers})(Ecommerce);