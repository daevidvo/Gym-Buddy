const router = require("express").Router();
const { User, Messages, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    const currentUser = userData.get({ plain: true });

    res.render("profile", {
      logged_in: req.session.logged_in,
      currentUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
  } else {
    res.render('signup', {
      logged_in: req.session.logged_in
    })
  }
})

module.exports = router;
