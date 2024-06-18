import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/SendCampaign.css';

function SendCampaign() {
  const { campaignId } = useParams(); 
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/customers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomers();
  }, []);

  const handleSendCampaign = async () => {
    setSending(true);
    try {
      const log = {
        customers: customers,
        campaign: { id: campaignId },  // Updated to include campaign object with ID
        description: description,
        status: 'PENDING',
        sentAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:8080/api/vendor/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Campaign sent successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="send-campaign-container">
      <h3>Send Campaign</h3>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <textarea
        className="description-input"
        placeholder="Enter campaign description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="customer-list">
        {customers.map(customer => (
          <div key={customer.id} className="customer-item">
            {customer.name}
          </div>
        ))}
      </div>
      <button 
        className="send-button"
        onClick={handleSendCampaign}
        disabled={sending}
      >
        {sending ? 'Sending...' : 'Send Campaign'}
      </button>
    </div>
  );
}

export default SendCampaign;
