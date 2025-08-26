const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const PDFDocument = require('pdfkit');

// ➤ Create (visitor check-in)
router.post('/', async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        await visitor.save();
        res.status(201).json(visitor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Admin: Get all visitors
router.get('/', async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.json(visitors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ➤ Update check-out time
router.put('/checkout/:id', async (req, res) => {
    try {
        const updated = await Visitor.findByIdAndUpdate(
            req.params.id,
            { checkOutTime: new Date() },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Allow frontend to send checkOutTime
router.put('/checkout/:id', async (req, res) => {
    try {
        const updated = await Visitor.findByIdAndUpdate(
            req.params.id,
            { checkOutTime: req.body.checkOutTime || new Date() },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ➤ Admin: Download visitor log as PDF
router.get('/download/pdf', async (req, res) => {
    try {
        const visitors = await Visitor.find();

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=visitor_log.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Visitor Log Report', { underline: true });
        doc.moveDown();

        visitors.forEach((v, i) => {
            doc.fontSize(12).text(`${i + 1}. Name: ${v.name}`);
            doc.text(`   Contact: ${v.contact}`);
            doc.text(`   Meeting Person: ${v.meetingPerson}`);
            doc.text(`   Purpose: ${v.purpose}`);
            doc.text(`   ID Proof: ${v.idProofType} - ${v.idProofNumber}`);
            doc.text(`   Check-In: ${new Date(v.checkInTime).toLocaleString()}`);
            doc.text(`   Check-Out: ${v.checkOutTime ? new Date(v.checkOutTime).toLocaleString() : 'Not yet'}`);
            doc.moveDown(1.5);
        });

        doc.end();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
