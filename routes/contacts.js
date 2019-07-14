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
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      {
        new: true
      }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 🧬');
  }
});

// @route       DELETE api/contacts/:id
// @desc        Delete contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let contact = await Contacts.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Contacts.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Contact deleted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 🧬');
  }
});

module.exports = router;
