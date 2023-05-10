const router = require('express').Router();
const { Matches, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userMatches = await Matches.findAll({
      where: { 
        [Op.or]: [
          { user1Id: req.session.user_id },
          { user2Id: req.session.connect_id }
        ]
      },
      include: [{ model: User, as: 'user_id' }, { model: Matches, as: 'connect_id' }]
    });

    res.render('matches', { logged_in: true, userMatches });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
