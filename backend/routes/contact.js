const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;
    const newMessage = await Contact.create({ name, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: "Mesaj kaydedilemedi." });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Mesajlar alınamadı." });
  }
});

module.exports = router;
