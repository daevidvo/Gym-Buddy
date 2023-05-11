const router = require('express').Router();
const { User, Matches } = require('../../models');

// Get all matches
router.get('/', async (req, res) => {
    try {
      // Get the current user's ID from their session
      const currentUserId = req.session.id;
      
      const matchData = await Matches.findAll({
        where: {
           user1Id: currentUserId,
           user2Id: req.body.user2Id
        },
        include: [
          {
            model: User,
            as: 'user1',
            attributes: ['id', 'username']
          },
          {
            model: User,
            as: 'user2',
            attributes: ['id', 'username']
          }
        ]
      });
      res.status(200).json(matchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


// Create a new match
router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id; // Get the user ID from session
    const matchData = await Matches.create({ user_id: userId, connect_id: req.body.connect_id }); // Add user ID to new match
    res.status(200).json(matchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


