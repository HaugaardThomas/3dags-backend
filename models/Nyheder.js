const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NyhederSchema = new mongoose.Schema({
  titel: {
    type: String,
    required: true,
  },
  beskrivelse: {
    type: String,
    required: false,
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

module.exports = mongoose.model('Nyheder', NyhederSchema)