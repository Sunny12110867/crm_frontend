import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './style/appStyle.css';

function App({ user, setUser }) { 

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Directly get the string
    if (storedUser) {
      setUser(storedUser); // Set user state directly
    }
  }, [setUser]); // Include setUser in the dependency array

  return (
    <div className='complete_body'>
      <header>
        <h1>CRM Application</h1>
        <div className="login-status">
          {user ? (
            <span>Welcome, {user}</span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
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
