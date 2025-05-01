const Reklam = require('../models/Reklam');

exports.getReklamlar = async (req, res) => {
  try {
    const reklamlar = await Reklam.find({});
    res.json(reklamlar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReklam = async (req, res) => {
  try {
    const yeniReklam = new Reklam(req.body);
    const kaydedilenReklam = await yeniReklam.save();
    res.json(kaydedilenReklam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
