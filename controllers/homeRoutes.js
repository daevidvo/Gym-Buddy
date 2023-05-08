const router = require('express').Router();
const { User, Message } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          attributes: ['name', 'age', 'bio', 'location'],
        },
      ],
    });
    res.json(userData);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
}
});

router.get('/', async (req, res) => {
    try {
      // Retrieve user information
      const user = await User.findByPk(req.user.id, {
        include: [
          {
            attributes: ['name', 'age', 'bio', 'location'],
          },
        ],
      });
  
      // Retrieve user's messages
      const messages = await Message.findAll({
        where: {
          userId: req.user.id,
        },
      });
  
      // Combine user and message data into a single object to send to the client
      const userData = {
        user: user,
        messages: messages,
      };
  
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
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

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/user');
    return;
  }

  res.render('login');
});

module.exports = router;
