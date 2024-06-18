import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/addcustomer.css';

function AddCustomer() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddCustomer = async (event) => {
    event.preventDefault();
    const customer = { name, email, phoneNumber };

    try {
      const response = await fetch('crmbackend-production-388a.up.railway.app/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        setMessage('Customer added successfully');
        navigate('/');
      } else {
        setMessage('Failed to add customer');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding customer');
    }
  };

  return (
    <div className="add-customer-container">
      <h2>Add Customer</h2>
      <form onSubmit={handleAddCustomer}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default AddCustomer;
