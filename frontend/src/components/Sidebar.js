// File: src/components/Sidebar.js
import React from 'react';


function Sidebar({ onNavigate }) {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Annai Ullam</h2>
      <ul className="sidebar-list">
        <li onClick={() => onNavigate('visitor')}>Visitor Log</li>
        <p> </p>
        <li onClick={() => onNavigate('donations')}>Donations 🔒</li>
        <p> </p>
        <li onClick={() => onNavigate('residents')}>Residents 🔒</li>
      </ul>
    </div>
  );
}

export default Sidebar;
