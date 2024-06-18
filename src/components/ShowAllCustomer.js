import React, { useState, useEffect } from 'react';
import '../style/ShowAllCustomer.css';

function ShowAllCustomer() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('crmbackend-production-388a.up.railway.app/api/customers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomers(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`crmbackend-production-388a.up.railway.app/api/customers/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setCustomers(customers.filter(customer => customer.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="show-all-customer-container">
            <h3>All Customers</h3>
            {customers.length === 0 ? (
                <p className="no-customers">No customers available.</p>
            ) : (
                <div className="customer-list">
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{new Date(customer.createdAt).toLocaleString()}</td>
                                    <td>{new Date(customer.updatedAt).toLocaleString()}</td>
                                    <td>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => handleDelete(customer.id)}
                                        >
                                            Delete
                                        </button>
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

export default ShowAllCustomer;
