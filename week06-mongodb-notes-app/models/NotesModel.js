const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated
const mongoose = require('mongoose');

// Create Note Schema
const noteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['HIGH', 'LOW', 'MEDIUM'],
    default: 'MEDIUM', // You can set a default value if needed
  },
  dateAdded: {
    type: Date,
    default: Date.now, // Set the current date and time as default
  },
  dateUpdated: {
    type: Date,
  },
});

// Create Note model
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
