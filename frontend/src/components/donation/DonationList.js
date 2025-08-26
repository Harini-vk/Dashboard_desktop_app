import React, { useEffect, useState } from 'react';
import DonationForm from './DonationForm';
import './donation.css';

function DonationList() {
  const [donations, setDonations] = useState([]);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);

  const fetchDonations = async () => {
    const res = await fetch('http://localhost:5000/donations');
    const data = await res.json();
    setDonations(data);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const onAdd = () => {
    setSelected(null);
    setView('add');
  };

  if (view !== 'list') {
    return (
      <DonationForm
        donation={selected}
        onCancel={() => {
          setView('list');
          setSelected(null);
        }}
        onSaved={() => {
          fetchDonations();
          setView('list');
          setSelected(null);
        }}
      />
    );
  }

  return (
    <div className="donation-wrapper">
      <div className="donation-header">
        <button className="add-button" onClick={onAdd}>ADD</button>
        <h2>DONATIONS</h2>
        <button
          className="pdf-button"
          onClick={() =>
            window.open('http://localhost:5000/donations/download/pdf')
          }
        >
          📄
        </button>
      </div>

      <div className="donation-cards">
        {donations.map((d) => (
          <div
            className="donation-card"
            key={d._id}
            onClick={() => {
              setSelected(d);
              setView('edit');
            }}
          >
            <div className="card-row">
              <div><strong>NAME:</strong> {d.donorName}</div>
              <div><strong>MODE OF PAYMENT:</strong> {d.Mode_of_payment}</div>
            </div>
            <div className="card-row">
              <div><strong>AMOUNT:</strong> ₹{d.amount}</div>
              <div><strong>CONTACT:</strong> {d.Contact}</div>
            </div>
            <div className="card-row">
              <div><strong>DATE:</strong> {new Date(d.date).toLocaleDateString()}</div>
              <div><strong>ADDRESS:</strong> {d.Address}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonationList;
