import React, { useState } from 'react';
import './resident.css';

function PasswordPopup({ onSubmit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (input === '123') {
      onSubmit(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="password-popup">
      <div className="popup-inner">
        <h3>Enter Admin Password</h3>
        <input type="password" placeholder='Enter Password' value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        {error && <p className="error">Incorrect password</p>}
      </div>
    </div>
  );
}

export default PasswordPopup;