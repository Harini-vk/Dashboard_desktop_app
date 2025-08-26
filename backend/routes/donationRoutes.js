const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');

const PDFDocument = require('pdfkit'); //for downloading it as pdf/excel
const fs = require('fs');



// Create
router.post('/', async (req, res) => {
    console.log(req.body); // added this one (to see whom i have added)
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.json(newDonation);
});



// Read
router.get('/', async (req, res) => {
    const donations = await Donation.find();
    res.json(donations);
});


// Update
router.put('/:id', async (req, res) => {
    const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});


// Download as PDF
router.get('/download/pdf', async (req, res) => {
    try {
        const donations = await Donation.find();

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=donations.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Donation Records', { underline: true });

        donations.forEach((d, i) => {
            doc.moveDown();
            doc.fontSize(12).text(`${i + 1}. Name: ${d.donorName}`);
            doc.text(`   Amount: ₹${d.amount}`);
            doc.text(`   Payment Mode: ${d.mode_of_payment}`);
            doc.text(`   Contact: ${d.contact}`);
            doc.text(`   Address: ${d.address}`);
            doc.text(`   Date: ${new Date(d.date).toLocaleString()}`);
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
