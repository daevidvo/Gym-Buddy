const router = require('express').Router();
const { User, Messages, Matches } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
          attributes: {include: ['userName', 'age', 'bio']}
    });
    
    const user = userData.map((data) => data.get({plain: true}))

    if (!user) {
      res.status(400).json({message: 'error in retrieving user data'})
    }

    res.render('homepage', {
      logged_in: req.session.logged_in
    })
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/user', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try{
    res.render('signup', {
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/user');
    return;
  }

  res.render('login');
});

module.exports = router;
