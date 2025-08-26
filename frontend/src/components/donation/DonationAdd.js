// src/components/donation/DonationAdd.js
import React from 'react';
import DonationForm from './DonationForm';

function DonationAdd({ onCancel }) {
  return <DonationForm onCancel={onCancel} onSaved={onCancel} />;
}

export default DonationAdd;
