const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Mode_of_payment : {
        type: String,
        required: true
    },
    Contact : {
        type: Number,
        required: true
    },
    Address : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Donation', donationSchema);
