const router = require('express').Router();
const { Good } = require('../db/models');

router.get('/', async (req, res) => {
  const goods = await Good.find();
  res.render('goods', { goods });
});

router.post('/', async (req, res) => {
  const {
    name, price, currency, count,
  } = req.body;

  const newGood = new Good({
    name, price, currency, count,
  });

  try {
    await newGood.save();
  } catch (error) {
    return res.status(500).end();
  }

  return res.json({ good: newGood });
});

router.delete('/', async (req, res) => {
  try {
    await Good.findByIdAndDelete(req.body.goodID);
  } catch (error) {
    return res.status(500).end();
  }

  return res.status(200).end();
});

module.exports = router;
