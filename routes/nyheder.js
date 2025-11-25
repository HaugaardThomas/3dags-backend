const express = require('express');
require('dotenv').config();

// Models
const NyhederModel = require('../models/Nyheder.js');




const router = express.Router()

router.get('/getALl', async (req, res) => {
  try {
    const nyheder = await NyhederModel.find();
    res.status(200).json(nyheder);
  } catch (error) {
    res.status(500).json({ message: 'Fejl kunne ikke hente nyheder', error });
  }
});

router.get('/nyheder/:id', async (req, res) => {
  try {
    const nyhed = await NyhederModel.findById(req.params.id);
    if (!nyhed) return res.status(404).json({ error: 'Nyhed ikke fundet' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Fejl kunne ikke hente nyhed', error });
  }
});

router.post('/createNyhed', async (req, res) => {
  try {

    const newNyhed = new NyhederModel({
      titel: req.body.titel,
      beskrivelse: req.body.beskrivelse
    });

    const savedNyhed = await newNyhed.save();
    res.status(201).json(savedNyhed);
  } catch (error) {
    res.status(400).json({ message: 'Fejl kunne ikke oprette nyhed', error });
  }
});

router.put('/changeNyhed/:id', async (req, res) => {
  try {
    const updateFields = {
      product: req.body.titel,
      price: req.body.beskrivelse,
    };

    const updatedNyhed = await NyhederModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    if (!updatedNyhed) return res.status(404).json({ error: 'Nyheder ikke fundet' });

    res.status(200).json(updatedNyhed);
  } catch (error) {
    res.status(400).json({ message: 'Fejl kunne ikke opdatere nyhed', error });
  }
});

router.delete('/deleteNyhed/:id', async (req, res) => {
  try {
    const deletedNyhed = await NyhederModel.findByIdAndDelete(req.params.id);
    if (!deletedNyhed) return res.status(404).json({ message: 'Produkt ikke fundet' });
    res.status(200).json({ message: 'Nyhed slettet' });
  } catch (error) {
    res.status(500).json({ message: 'Fejl kunne ikke slette nyheden', error });
  }
});


module.exports = router