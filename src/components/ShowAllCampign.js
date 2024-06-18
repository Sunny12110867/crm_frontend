import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ShowAllCampaign.css';

function ShowAllCampaign() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/campaigns');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/campaigns/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSend = (campaign) => {
    navigate(`/send-campaign/${campaign.id}`);
  };

  const handleViewLogs = (campaign) => {
    navigate(`/campaigns/${campaign.id}/logs`);
  };

  return (
    <div className="show-all-campaign-container">
      <h3>All Campaigns</h3>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {campaigns.length === 0 ? (
        <p className="no-campaigns">No campaigns available.</p>
      ) : (
        <div className="campaign-list">
          <table className="campaign-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Rules</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id}>
                  <td>{campaign.name}</td>
                  <td>{campaign.description}</td>
                  <td>
                    <pre>{JSON.stringify(JSON.parse(campaign.rules), null, 2)}</pre>
                  </td>
                  <td>
                    <button className="send-button" onClick={() => handleSend(campaign)}>Send</button>
                    <button className="delete-button" onClick={() => handleDelete(campaign.id)}>Delete</button>
                    <button className="view-logs-button" onClick={() => handleViewLogs(campaign)}>View Logs</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowAllCampaign;
