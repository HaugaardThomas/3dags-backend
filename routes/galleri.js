const express = require('express');
require('dotenv').config();

// Models
const GalleriModel = require('../models/Galleri.js');

// Middleware
const upload = require('../middleware/uploads.js')


const router = express.Router()

router.get('/getALl', async (req, res) => {
  try {
    const galleri = await GalleriModel.find();
    res.status(200).json(galleri);
  } catch (error) {
    res.status(500).json({ message: 'Fejl kunne ikke hente galleri', error });
  }
});

router.post('/createGalleri', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null;

    const newGalleri = new GalleriModel({
      image: imagePath,
    });

    const savedGalleri = await newGalleri.save();
    res.status(201).json(savedGalleri);
  } catch (error) {
    res.status(400).json({ error: 'Fejl kunne ikke oprette galleri', error });
  }
});

router.delete('/deleteGalleri/:id', async (req, res) => {
  try {
    const deletedGalleri = await GalleriModel.findByIdAndDelete(req.params.id);
    if (!deletedGalleri) return res.status(404).json({ message: 'Galleri ikke fundet' });
    res.status(200).json({ message: 'Galleri slettet' });
  } catch (error) {
    res.status(500).json({ message: 'Fejl kunne ikke slette galleri', error });
  }
});


module.exports = router