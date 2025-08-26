// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const donationRoutes = require('./routes/donationRoutes');  // donations

const app = express();
app.use(cors());
app.use(express.json()); 
app.use('/donations', donationRoutes); // use routes

const residentRoutes = require('./routes/residentRoutes'); // resident
app.use('/residents', residentRoutes);


const visitorRoutes = require('./routes/visitorRoutes');  //visitor log
app.use('/visitors', visitorRoutes);


// ✅ Serve uploaded images
app.use('/uploads', express.static('uploads'));



// app.use('/donations', donationRoutes);
// app.use('/residents', residentRoutes);
// app.use('/visitors', visitorRoutes);



// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.error("MongoDB connection error:", err));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

