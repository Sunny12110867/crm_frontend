import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../style/CommunicationLogs.css';

function CommunicationLogs() {
  const { campaignId } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/communications-logs/campaign/${campaignId}/logs`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [campaignId]);

  return (
    <div className="communication-logs-container">
      <h3>Communication Logs for Campaign {campaignId}</h3>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      {logs.length === 0 ? (
        <p className="no-logs">No communication logs available.</p>
      ) : (
        <table className="logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Sent At</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.description}</td>
                <td>{new Date(log.sentAt).toLocaleString()}</td>
                <td>{log.status}</td>
                <td>{new Date(log.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CommunicationLogs;
