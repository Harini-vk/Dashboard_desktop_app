// import React, { useState } from 'react';
// import Sidebar from './components/Sidebar';
// import VisitorLog from './components/visitor/VisitorLog';
// import ResidentList from './components/resident/ResidentList';
// import ResidentDetail from './components/resident/ResidentDetail';
// import ResidentForm from './components/resident/ResidentForm';
// import PasswordPopup from './components/resident/PasswordPopup';
// import DonationDetail from './components/donation/DonationDetail';
// import DonationPopup from './components/donation/DonationPopup';
// import DonationList from './components/donation/DonationList';
// import DonationForm from './components/donation/DonationForm';

// import './style.css';

// function App() {
//   const [showResident, setShowResident] = useState(false);
//   const [showDonation, setShowDonation] = useState(false);
//   const [popup, setPopup] = useState(false);
//   const [donationPopup, setDonationPopup] = useState(false);
//   const [view, setView] = useState('list');
//   const [selected, setSelected] = useState(null);

//   const handleResidentAccess = () => {
//     setPopup(true);
//   };

//   const handleDonationAccess = () => {
//     setDonationPopup(true);
//   };

//   const handlePasswordSubmit = (success) => {
//     setPopup(false);
//     if (success) {
//       setShowResident(true);
//       setShowDonation(false);
//     }
//   };

//   const handleDonationPasswordSubmit = (success) => {
//     setDonationPopup(false);
//     if (success) {
//       setShowDonation(true);
//       setShowResident(false);
//     }
//   };

//   const handleSave = async (formData) => {
//     const method = selected ? 'PUT' : 'POST';
//     const url = selected ? `http://localhost:5000/residents/${selected._id}` : 'http://localhost:5000/residents';
//     await fetch(url, {
//       method,
//       body: formData
//     });
//     setSelected(null);
//     setView('list');
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:5000/residents/${id}`, { method: 'DELETE' });
//     setView('list');
//   };

//   return (
//     <div className="app-container">
//       <Sidebar onNavigate={(section) => {
//         if (section === 'residents') {
//           handleResidentAccess();
//         } else if (section === 'donations') {
//           handleDonationAccess();
//         } else if (section === 'visitor') {
//           setShowResident(false);
//           setShowDonation(false);
//           setView('list');
//           setSelected(null);
//         }
//       }} />

//       {popup && <PasswordPopup onSubmit={handlePasswordSubmit} />}
//       {donationPopup && <DonationPassword onSubmit={handleDonationPasswordSubmit} />}

//       {!showResident && !showDonation && <VisitorLog />}

//       {showResident && view === 'list' && (
//         <ResidentList onSelect={(res) => { setSelected(res); setView('detail'); }} onAdd={() => setView('add')} />
//       )}
//       {showResident && view === 'detail' && selected && (
//         <ResidentDetail
//           resident={selected}
//           onEdit={(res) => { setSelected(res); setView('edit'); }}
//           onDelete={handleDelete}
//           onBack={() => setView('list')}
//         />
//       )}
//       {showResident && (view === 'add' || view === 'edit') && (
//         <ResidentForm
//           data={view === 'edit' ? selected : {}}
//           onSave={handleSave}
//           onCancel={() => setView('list')}
//         />
//       )}

//       {showDonation && view === 'list' && (
//         <DonationList onAdd={() => setView('addDonation')} onEdit={(donation) => { setSelected(donation); setView('editDonation'); }} />
//       )}
//       {showDonation && view === 'addDonation' && (
//         <DonationForm onCancel={() => setView('list')} />
//       )}
//       {showDonation && view === 'editDonation' && selected && (
//         <DonationEdit donation={selected} onCancel={() => setView('list')} />
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VisitorLog from './components/visitor/VisitorLog';

import ResidentList from './components/resident/ResidentList';
import ResidentDetail from './components/resident/ResidentDetail';
import ResidentForm from './components/resident/ResidentForm';
import PasswordPopup from './components/resident/PasswordPopup';

import DonationPopup from './components/donation/DonationPopup';
import DonationList from './components/donation/DonationList';
import DonationAdd from './components/donation/DonationAdd';
import DonationEdit from './components/donation/DonationEdit';

import './style.css';

function App() {
  const [showResident, setShowResident] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [popup, setPopup] = useState(false);
  const [donationPopup, setDonationPopup] = useState(false);
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);

  const handleResidentAccess = () => {
    setPopup(true);
  };

  const handleDonationAccess = () => {
    setDonationPopup(true);
  };

  const handlePasswordSubmit = (success) => {
    setPopup(false);
    if (success) {
      setShowResident(true);
      setShowDonation(false);
      setView('list');
    }
  };

  const handleDonationPasswordSubmit = (success) => {
    setDonationPopup(false);
    if (success) {
      setShowDonation(true);
      setShowResident(false);
      setView('list');
    }
  };

  const handleResidentSave = async (formData) => {
    const method = selected ? 'PUT' : 'POST';
    const url = selected
      ? `http://localhost:5000/residents/${selected._id}`
      : 'http://localhost:5000/residents';
    await fetch(url, {
      method,
      body: formData,
    });
    setSelected(null);
    setView('list');
  };

  const handleResidentDelete = async (id) => {
    await fetch(`http://localhost:5000/residents/${id}`, { method: 'DELETE' });
    setView('list');
  };

  return (
    <div className="app-container">
      <Sidebar
        onNavigate={(section) => {
          if (section === 'residents') {
            handleResidentAccess();
          } else if (section === 'donations') {
            handleDonationAccess();
          } else if (section === 'visitor') {
            setShowResident(false);
            setShowDonation(false);
            setView('list');
            setSelected(null);
          }
        }}
      />

      {/* Password Popups */}
      {popup && <PasswordPopup onSubmit={handlePasswordSubmit} />}
      {donationPopup && <DonationPopup onSubmit={handleDonationPasswordSubmit} />}

      {/* Visitor Log (default view) */}
      {!showResident && !showDonation && <VisitorLog />}

      {/* Residents Flow */}
      {showResident && view === 'list' && (
        <ResidentList
          onSelect={(res) => {
            setSelected(res);
            setView('detail');
          }}
          onAdd={() => setView('add')}
        />
      )}
      {showResident && view === 'detail' && selected && (
        <ResidentDetail
          resident={selected}
          onEdit={(res) => {
            setSelected(res);
            setView('edit');
          }}
          onDelete={handleResidentDelete}
          onBack={() => setView('list')}
        />
      )}
      {showResident && (view === 'add' || view === 'edit') && (
        <ResidentForm
          data={view === 'edit' ? selected : {}}
          onSave={handleResidentSave}
          onCancel={() => setView('list')}
        />
      )}

      {/* Donations Flow */}
      {showDonation && view === 'list' && (
        <DonationList
          onAdd={() => setView('addDonation')}
          onEdit={(donation) => {
            setSelected(donation);
            setView('editDonation');
          }}
        />
      )}
      {showDonation && view === 'addDonation' && (
        <DonationAdd onCancel={() => setView('list')} />
      )}
      {showDonation && view === 'editDonation' && selected && (
        <DonationEdit donation={selected} onCancel={() => setView('list')} />
      )}
    </div>
  );
}

export default App;
