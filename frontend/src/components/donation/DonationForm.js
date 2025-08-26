// src/components/donation/DonationForm.js
import React, { useState } from 'react';
import './donation.css';

const modes = ['Cash', 'Card', 'UPI', 'Netbanking'];

function DonationForm({ donation = {}, onCancel, onSaved }) {
  donation = donation || {};
  const [form, setForm] = useState({
    donorName: donation.donorName || '',
    amount: donation.amount || '',
    date: donation.date ? donation.date.substring(0, 10) : '',
    Mode_of_payment: donation.Mode_of_payment || 'Cash',
    Contact: donation.Contact || '',
    Address: donation.Address || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = donation._id ? 'PUT' : 'POST';
    const url = donation._id
      ? `http://localhost:5000/donations/${donation._id}`
      : `http://localhost:5000/donations`;

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      onSaved();
    } else {
      alert('Failed to save donation.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure to delete this donation?')) {
      await fetch(`http://localhost:5000/donations/${donation._id}`, {
        method: 'DELETE',
      });
      onSaved();
    }
  };

  return (
    <form className="donation-form" onSubmit={handleSubmit}>
      <h2>{donation._id ? 'Edit Donation' : 'Add Donation'}</h2>

      <input name="donorName" placeholder="Name" value={form.donorName} onChange={handleChange} required />
      <input name="amount" placeholder="Amount" type="number" value={form.amount} onChange={handleChange} required />
      <input name="date" type="date" value={form.date} onChange={handleChange} required />

      <select name="Mode_of_payment" value={form.Mode_of_payment} onChange={handleChange}>
        {modes.map((mode) => (
          <option key={mode} value={mode}>{mode}</option>
        ))}
      </select>

      <input name="Contact" placeholder="Contact" value={form.Contact} onChange={handleChange} />
      <textarea name="Address" placeholder="Address" value={form.Address} onChange={handleChange}></textarea>

      <div className="donation-buttons">
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
        {donation._id && <button type="button" onClick={handleDelete}>Delete</button>}
      </div>
    </form>
  );
}

export default DonationForm;
