import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
  
      const accessToken = response.data.access;
  
      localStorage.setItem('token', accessToken);
  
      onLoginSuccess();

      setError('');
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login error:', error);
    }
  };
  
  return (
    <div>
      <h2 style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px' }}>Login</h2>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            fontSize: '16px' 
          }}
        >
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
    </div>

  );
}

export default LoginForm;
