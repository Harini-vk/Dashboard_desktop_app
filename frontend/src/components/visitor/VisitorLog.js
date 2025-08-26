import React, { useState } from 'react';
import calendarImg from './event.png';
import bannerImg from './banner.png';
export default function VisitorLog() {
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    meetingPerson: '',
    purpose: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleCheckIn = async () => {
  try {
    await fetch('http://localhost:5000/visitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    alert('Visitor Checked-In!');
    setFormData({ name: '', contact: '', meetingPerson: '', purpose: '' });
  } catch (err) {
    alert('Error checking in');
  }
};

  // const handleCheckOut = async () => {
  //   const id = prompt('Enter Visitor ID to check out:');
  //   if (!id) return;

  //   try {
  //     const res = await fetch(`http://localhost:5000/visitors/checkout/${id}`, {
  //       method: 'PUT'
  //     });

  //     const data = await res.json();
  //     alert('Visitor Checked-Out!');
  //   } catch (err) {
  //     alert('Error checking out');
  //   }
  // };

const handleCheckOut = async () => {
  const id = prompt('Enter Visitor ID to check out:');
  if (!id) return;

  const checkOutTime = new Date().toISOString();

  try {
    const res = await fetch(`http://localhost:5000/visitors/checkout/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checkOutTime })
    });

    const data = await res.json();
    alert('Visitor Checked-Out at ' + new Date(data.checkOutTime).toLocaleTimeString());
  } catch (err) {
    alert('Error checking out');
  }
};


//   return (
//   <div className="visitor-log">
//     <div className="visitor-card">
//       <h2>VISITOR LOG</h2>
//       <input name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required/>
//       <input name="contact" placeholder="Enter Contact" value={formData.contact} onChange={handleChange} required/>
//       <input name="meetingPerson" placeholder="Enter their NAME / GENERAL:" value={formData.meetingPerson} onChange={handleChange} />
//       <textarea name="purpose" placeholder="PURPOSE :" value={formData.purpose} onChange={handleChange} />
//       <div className="button-group">
//         <button className="check-in" onClick={handleCheckIn}>Check-In</button>
//         <button className="check-out" onClick={handleCheckOut}>Check-Out</button>
//       </div>
//     </div>
//   </div>
// );
// }


  return (
    <div className="visitor-log-wrapper">
      <div className="visitor-log">
        <div className="visitor-card">
          <h2>VISITOR LOG</h2>
          <input name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
          <input name="contact" placeholder="Enter Contact" value={formData.contact} onChange={handleChange} required />
          <input name="meetingPerson" placeholder="Enter their NAME / GENERAL:" value={formData.meetingPerson} onChange={handleChange} />
          <textarea name="purpose" placeholder="PURPOSE :" value={formData.purpose} onChange={handleChange} />
          <div className="button-group">
            <button className="check-in" onClick={handleCheckIn}>Check-In</button>
            <button className="check-out" onClick={handleCheckOut}>Check-Out</button>
          </div>
        </div>

        <div className="calendar-image">
          <img src={calendarImg} alt="Calendar" />
        </div>
      </div>

      <div className="banner-container">
        <img src={bannerImg} alt="Banner" />
      </div>
    </div>
  );
}

// // src/components/visitor/VisitorLog.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import eventImg from './event.png';
// import bannerImg from './banner.png';

// function VisitorLog() {
//   const [visitor, setVisitor] = useState({
//     name: '',
//     contact: '',
//     whomToMeet: '',
//     purpose: '',
//   });

//   const handleChange = (e) => {
//     setVisitor({ ...visitor, [e.target.name]: e.target.value });
//   };

//   const handleCheckIn = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/visitors', {
//         ...visitor,
//         checkIn: new Date(),
//       });
//       alert('Checked in successfully!');
//       setVisitor({ name: '', contact: '', whomToMeet: '', purpose: '' });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleCheckOut = async () => {
//     try {
//       await axios.put('http://localhost:5000/api/visitors/checkout', {
//         contact: visitor.contact,
//         checkOut: new Date(),
//       });
//       alert('Checked out successfully!');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="visitor-log-wrapper">
//       <div className="visitor-log">
//         <div className="visitor-card">
//           <h2>VISITOR LOG</h2>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             name="name"
//             value={visitors.name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Enter Contact"
//             name="contact"
//             value={visitors.contact}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             placeholder="Enter their name / GENERAL"
//             name="whomToMeet"
//             value={visitors.whomToMeet}
//             onChange={handleChange}
//           />
//           <textarea
//             placeholder="PURPOSE"
//             name="purpose"
//             value={visitors.purpose}
//             onChange={handleChange}
//           />
//           <div className="button-group">
//             <button className="check-in" onClick={handleCheckIn}>
//               Check-In
//             </button>
//             <button className="check-out" onClick={handleCheckOut}>
//               Check-Out
//             </button>
//           </div>
//         </div>

//         <div className="visitor-event-img">
//           <img src={eventImg} alt="Event calendar" />
//         </div>
//       </div>

//       <div className="visitor-banner">
//         <img src={bannerImg} alt="Visitor stats banner" />
//       </div>
//     </div>
//   );
// }

// export default VisitorLog;
