import React, { useState } from 'react';
import './resident.css';

function ResidentForm({ data = {}, onSave, onCancel }) {
  const [form, setForm] = useState({ ...data });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (photo) formData.append('photo', photo);
    await onSave(formData);
  };

  return (
    <form className="resident-form" onSubmit={handleSubmit}>
      <h2>RESIDENTS</h2>
      <button className="back-btn" type="button" onClick={onCancel}>←</button>
      {['name', 'age', 'place', 'guardian', 'contact', 'address', 'disease', 'lastcheckup', 'identificationmarks'].map(field => (
        <input key={field} type="text" name={field} placeholder={`Enter ${field}`} value={form[field] || ''} onChange={handleChange} />
      ))}
      <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
      <button className="submit-btn" type="submit">{data._id ? 'SAVE' : 'ADD'}</button>
    </form>
  );
}


export default ResidentForm