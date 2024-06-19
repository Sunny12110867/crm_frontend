import React, { useState } from 'react';
import '../style/MakeOrder.css'

function MakeOrder() {
  const [customerId, setCustomerId] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      customer: { id: customerId },
      orderDate,
      totalAmount
    };

    try {
      const response = await fetch('https://crmbackend-production-fab8.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage('Order created successfully');
      } else {
        setMessage('Failed to create order');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="make-order-container">
      <h2>Make Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Order Date:</label>
          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Amount:</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MakeOrder;
