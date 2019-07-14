const express = require('express');
const router = express.Router();
// Middlware
const auth = require('../middleware/auth');

// Model
const User = require('../models/User');
const Contacts = require('../models/Contacts');

// @route       GET api/contacts
// @desc        Get all user contacts
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1
    });
    res.status(200).json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).json('Server error');
  }
});

// @route       POST api/contacts
// @desc        Register a user
// @access      Public
router.post('/', (req, res) => {
  res.send('Add contact');
});

// @route       UPDATE api/contacts/:id
// @desc        Update contact
// @access      Public
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Public
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
