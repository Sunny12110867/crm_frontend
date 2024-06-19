import React, { useState } from 'react';
import '../style/login.css';
import { Link, Navigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    const response = await fetch(`https://crmbackend-production-fab8.up.railway.app/api/users/login?email=${email}&password=${password}`);
    const user = await response.json();
    if (user) {
      setMessage('Login successful');
      setIsLoggedIn(true);
      setUser(email);
      localStorage.setItem('user', email); 
    } else {
      setMessage('Invalid email or password');
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
