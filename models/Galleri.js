const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GalleriSchema = new mongoose.Schema({
  image: {
    type: String,
    default: null,
  },
  creationDate: {
        type: Date,
        default: Date.now
    }
},
{
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Galleri', GalleriSchema)