const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: String,
    contact: String,
    meetingPerson: String,
    purpose: String,
    idProofType: String,
    idProofNumber: String,
    checkInTime: {
        type: Date,
        default: Date.now  // auto-fill ??
    },
    checkOutTime: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);
