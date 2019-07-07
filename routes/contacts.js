const express = require('express');
const router = express.Router();

// @route       GET api/contacts
// @desc        Get all user contacts
// @access      Public
router.get('/', (req, res) => {
  res.send('Get all contacts');
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
