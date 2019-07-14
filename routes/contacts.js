const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
// Middlware
const auth = require('../middleware/auth');

// Model
const User = require('../models/User');
const Contacts = require('../models/Contacts');

// @route       GET api/contacts
// @desc        Get all user contacts
// @access      Private
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
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error 🧬');
    }
  }
);

// @route       UPDATE api/contacts/:id
// @desc        Update contact
// @access      Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
