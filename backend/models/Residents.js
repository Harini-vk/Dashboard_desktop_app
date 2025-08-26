const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    place: String,
    guardian: String,
    contact: String,
    address: String,
    disease: String,
    lastCheckup: Date,
    identificationMarks: String,
    photo: String // stores filename like 'photo-123456.jpg'

});

module.exports = mongoose.model('Resident', residentSchema);
