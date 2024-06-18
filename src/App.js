import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style/appStyle.css';

function App() {
  return (
    <div className='complete_body'>
      <header>
        <h1>CRM Application</h1>
      </header>
      <nav>
      <div>
          <Link to="/show-all-customer">Show customer</Link>
        </div>
        <div>
          <Link to="/add-customer">Add Customer</Link>
        </div>
        <div>
          <Link to="/create-campign">Create Campaign</Link>
        </div>
        <div>
          <Link to="/make-order">Make Order</Link>
        </div>
        <div>
          <Link to="/show-all-campign">Show All Campaign</Link>
        </div>
       
        
      </nav>
        <Outlet />
     
    </div>
  );
}

export default App;
