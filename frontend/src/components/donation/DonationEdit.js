// src/components/donation/DonationEdit.js
import React from 'react';
import DonationForm from './DonationForm';

function DonationEdit({ donation, onCancel }) {
  return <DonationForm donation={donation} onCancel={onCancel} onSaved={onCancel} />;
}

export default DonationEdit;
