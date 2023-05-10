const router = require('express').Router();
const { Matches, User } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    const userMatches = await Matches.findAll({
      where: { 
        [Op.or]: [
            console.log(Matches),
          { user_id: req.session.user_id },
          { connect_id: req.session.connect_id }
        ]
      },
      include: [{ model: User, as: 'user_id' }, { model: Matches, as: 'connect_id' }]
    });
    console.log(userMatches)
    res.render('matches', { logged_in: true, userMatches });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
