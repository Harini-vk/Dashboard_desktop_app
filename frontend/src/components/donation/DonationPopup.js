// src/components/donation/DonationPopup.js
import React, { useState } from 'react';
import './donation.css';

function DonationPopup({ onSubmit }) {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (password === '123') {
      onSubmit(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="password-popup">
      <div className="popup-inner">
        <h3>Enter Admin Password</h3>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default DonationPopup;
