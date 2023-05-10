const router = require('express').Router();
const { Matches, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    const userMatches = await Matches.findAll({
      where: { 
        [Op.or]: [
          { user_id: req.session.user_id },
          { connect_id: req.session.user_id }
        ]
      },
      include: [{ model: User, attributes: {exclude:['password', 'email']}}],
      
    });
    console.log(JSON.stringify(userMatches, null, 2)); 
    const matchData = JSON.stringify(userMatches, null, 2);
    res.render('matches', { logged_in: true, userMatches, matchData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
