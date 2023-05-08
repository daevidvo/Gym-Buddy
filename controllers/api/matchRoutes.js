const router = require('express').Router();
const { User, Matches, } = require('../../models');

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matchData = await Matches.findAll();
    res.status(200).json(matchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
      const newMatch = await Matches.create(req.body);
      res.status(200).json(newMatch);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;

