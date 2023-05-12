const router = require('express').Router();
const { User, Matches } = require('../../models');

// Get all matches
router.get('/', async (req, res) => {
    try {
      // Get the current user's ID from their session
      const currentUserId = req.session.id;
      
      // Find all Matches where user1Id is the current user and user2Id is the specified user
      const matchData = await Matches.findAll({
        where: {
           user1Id: currentUserId,
           user2Id: req.body.user2Id
        },
        // Include the user1 and user2 models, with only the id and username attributes
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
      // Send the match data as a JSON response with a 200 status code
      res.status(200).json(matchData);
    } catch (err) {
      // Send any errors as a JSON response with a 500 status code
      res.status(500).json(err);
    }
  });
  


// Create a new match
router.post('/', async (req, res) => {
  try {
    const userId = req.session.user_id; // Get the user ID from session
    const matchData = await Matches.create({ user_id: userId, connect_id: req.body.connect_id }); // Add user ID to new match
    res.status(200).json(matchData); // Send the match data as a JSON response with a 200 status code
  } catch (err) {
    res.status(500).json(err);// Send any errors as a JSON response with a 500 status code
  }
});

module.exports = router;


