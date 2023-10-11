const express = require('express');
const router = express.Router();
const Note = require('../models/Notes.js');

// Create a new Note
router.post('/notes', (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription) {
    return res.status(400).send({
      message: "Note title and description are required"
    });
  }

  // Create a new note
  const newNote = new Note({
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority || 'MEDIUM',
    dateAdded: new Date(),
    dateUpdated: null
  });

  // Save the note to the database
  newNote.save()
    .then(note => {
      res.send(note);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
});

// Retrieve all Notes
router.get('/notes', (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', (req, res) => {
  Note.findById(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId
      });
    });
});

// Update a Note with noteId
router.put('/notes/:noteId', (req, res) => {
  // Validate request
  if (!req.body.noteTitle || !req.body.noteDescription) {
    return res.status(400).send({
      message: "Note title and description are required"
    });
  }

  Note.findByIdAndUpdate(req.params.noteId, {
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    priority: req.body.priority || 'MEDIUM',
    dateUpdated: new Date()
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    });
});

// Delete a Note with noteId
router.delete('/notes/:noteId', (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
});

module.exports = router;
