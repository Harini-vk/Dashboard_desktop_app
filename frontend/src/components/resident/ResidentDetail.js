import React from 'react';
import './resident.css';

function ResidentDetail({ resident, onEdit, onDelete, onBack }) {

    const labelMap = {
    name: 'Name',
    age: 'Age',
    place: 'Place',
    guardian: 'Guardian',
    contact: 'Contact',
    address: 'Address',
    disease: 'Disease',
    lastcheckup: 'Last Checkup',
    identificationmarks: 'Identification Marks'
  };

 return (
    <div className="resident-detail">
      <button className="back-btn" onClick={onBack}>←</button>
      <h2>RESIDENTS</h2>

      <div className="resident-detail-container">
        <img src={`http://localhost:5000/uploads/${resident.photo}`} alt="Profile" className="resident-detail-img" />

        <div className="resident-info-section">
           {Object.keys(labelMap).map(field => (
            <p key={field}>
              <strong>{labelMap[field]}: </strong>{resident[field]}
            </p>
          ))}
        </div>

        <button className="edit-btn" onClick={() => onEdit(resident)}>✏️</button>
        <button className="delete-btn" onClick={() => onDelete(resident._id)}>🗑️</button>
      </div>
    </div>
  );
}


export default ResidentDetail;