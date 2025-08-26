const express = require('express');
const router = express.Router();
const Resident = require('../models/Residents');
const multer = require('multer');

const PDFDocument = require('pdfkit'); //for downloading pdf
const fs = require('fs');


const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, 'photo-' + Date.now() + path.extname(file.originalname));
    }
});

// const storage = multer.memoryStorage(); // store photo in memory
const upload = multer({ storage: storage });



// Create a new resident
router.post('/', upload.single('photo'), async (req, res) => {
    try {
        const {
            name,
            age,
            place,
            guardian,
            contact,
            address,
            disease,
            lastcheckup,
            identificationmarks
        } = req.body;

        const resident = new Resident({
            name,
            age,
            place,
            guardian,
            contact,
            address,
            disease,
            lastcheckup,
            identificationmarks,
            photo: req.file ? req.file.filename : ''
        });

        await resident.save();
        res.status(201).json(resident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// // Create a new resident
// router.post('/', upload.single('photo'), async (req, res) => {
//     try {
//         const { name, age, gender, contact, address } = req.body;

//         const resident = new Resident({
//             name,
//             age,
//             gender,
//             contact,
//             address,
//             photo: req.file ? req.file.buffer.toString('base64') : ''
//         });

//         await resident.save();
//         res.status(201).json(resident);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// Read all residents
router.get('/', async (req, res) => {
    try {
        const residents = await Resident.find();
        res.json(residents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a resident
router.put('/:id', upload.single('photo'), async (req, res) => {
    try {
        const updatedData = { ...req.body };
        if (req.file) {
            updatedData.photo = req.file.filename;
        }


        const resident = await Resident.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(resident);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a resident
router.delete('/:id', async (req, res) => {
    try {
        await Resident.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// to download the pdf
// const PDFDocument = require('pdfkit');

router.get('/download/pdf', async (req, res) => {
    try {
        const residents = await Resident.find();

        const doc = new PDFDocument({ margin: 30 });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=residents_with_photos.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Resident Records with Photos', { underline: true });
        doc.moveDown();

        for (let i = 0; i < residents.length; i++) {
            const r = residents[i];

            doc.fontSize(12).text(`${i + 1}. Name: ${r.name}`);
            doc.text(`   Age: ${r.age}`);
            doc.text(`   Place: ${r.place}`);
            doc.text(`   Guardian: ${r.guardian}`);
            doc.text(`   Contact: ${r.contact}`);
            doc.text(`   Address: ${r.address}`);
            doc.text(`   Disease: ${r.disease}`);
            doc.text(`   Last Checkup: ${new Date(r.lastCheckup).toLocaleDateString()}`);
            doc.text(`   Identification Marks: ${r.identificationMarks}`);

            // Add photo if available
            if (r.photo) {
              const imagePath = path.join(__dirname, '..', 'uploads', r.photo);
                if (fs.existsSync(imagePath)) {
                   doc.image(imagePath, {
                   fit: [100, 100],
                   align: 'right',
                   valign: 'top'
                 });
               } else {
                 doc.text('❌ Photo not found.');
               }
             }

             doc.moveDown(2);
           }

           doc.end();
         } catch (err) {
           console.error(err);
           res.status(500).json({ error: err.message });
  }
});



module.exports = router;


