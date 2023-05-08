const router = require('express').Router();
const { User, Matches } = require('../../models');

// Get all matches
router.get('/', async (req, res) => {
    try {
      // Get the current user's ID from their session
      const currentUserId = req.session.userId;
      // Get all matches where the current user is either user1Id or user2Id
      const matchData = await Matches.findAll({
        where: {
          [Op.or]: [
            { user1Id: currentUserId },
            { user2Id: currentUserId }
          ]
        },
        include: [
          {
            model: User,
            as: 'user1',
            attributes: ['id', 'username', 'bio']
          },
          {
            model: User,
            as: 'user2',
            attributes: ['id', 'username', 'bio']
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
    const userId = req.session.userId; // Get the user ID from session
    const matchData = await Matches.create({ ...req.body, userId }); // Add user ID to new match
    res.status(200).json(matchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


