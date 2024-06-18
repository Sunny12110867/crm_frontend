import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/createCampaign.css';

function CreateCampaign() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rules, setRules] = useState([{ field: '', operator: '', value: '' }]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAddRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleRuleChange = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const handleCreateCampaign = async (event) => {
    event.preventDefault();
    const campaign = { name, description, rules: JSON.stringify(rules) }; 

    try {
      const response = await fetch('crmbackend-production-388a.up.railway.app/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });

      if (response.ok) {
        setMessage('Campaign created successfully');
        navigate('/');
      } else {
        const errorResponse = await response.json();
        setMessage(`Error: ${errorResponse.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error creating campaign');
    }
  };

  return (
    <div className="create-campaign-container">
      <h2>Create Campaign</h2>
      <form onSubmit={handleCreateCampaign}>
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
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="rules-section">
          <h3>Rules</h3>
          {rules.map((rule, index) => (
            <div key={index} className="form-group rule">
              <input
                type="text"
                placeholder="Field"
                value={rule.field}
                onChange={(e) => handleRuleChange(index, 'field', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Operator"
                value={rule.operator}
                onChange={(e) => handleRuleChange(index, 'operator', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={rule.value}
                onChange={(e) => handleRuleChange(index, 'value', e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveRule(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRule}>Add Rule</button>
        </div>
        <button type="submit">Create Campaign</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateCampaign;
