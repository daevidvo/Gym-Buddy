// modules and imports
const router = require("express").Router();
const { User, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

// Route for displaying the user's profile
router.get("/", withAuth, async (req, res) => {
  try {
    // Query the database for the user's data, excluding the password
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    // Extract the plain object version of the user's data
    const currentUser = userData.get({ plain: true });
    // Render the profile template with the user's data
    res.render("profile", {
      logged_in: req.session.logged_in,
      currentUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route for displaying the login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  // Render the login template
  res.render("login");
});
// Route for displaying the signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/')
  } else {
    // Render the signup template
    res.render('signup', {
      logged_in: req.session.logged_in
    })
  }
})

module.exports = router;
