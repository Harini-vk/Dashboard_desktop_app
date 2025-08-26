import React, { useEffect, useState } from 'react';
import './resident.css';

function ResidentList({ onSelect, onAdd }) {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/residents')
      .then(res => res.json())
      .then(data => setResidents(data))
      .catch(err => console.log(err));
  }, []);



  return (
    <div className="residents-wrapper">
      <div className="residents-header">
        <button className="add-button" onClick={onAdd}>ADD</button>
        <h2>RESIDENTS</h2>
        <button className="pdf-button" onClick={() => window.open('http://localhost:5000/residents/download/pdf')}>📄</button>
      </div>
      <div className="resident-grid">
        {residents.map(resident => (
          <div key={resident._id} className="resident-card" onClick={() => onSelect(resident)}>

            <img src={resident.photo ? `http://localhost:5000/uploads/${resident.photo}` : '/default-avatar.png'} alt={resident.name} className="resident-card-img" />

            <p><strong>{resident.name}</strong></p>
            <p>{resident.age}</p>
            <p>{resident.place}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResidentList;