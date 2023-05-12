// modules and imports
const router = require("express").Router();
const matchRoutes = require("./matchRoutes.js");
const profileRoutes = require("./profileRoutes.js");
const testRoute = require('./testRoute.js')
const { User, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

// middlware
router.use("/profile", profileRoutes);
router.use("/matches", matchRoutes);
router.use('/test', testRoute)

// home route
router.get("/", withAuth, async (req, res) => {
  try {
    // Retrieve all user data except for their email and password
    const userData = await User.findAll({
      attributes: { exclude: ["email", "password"] },
    });

    const users = userData.map((data) => data.get({ plain: true }));

    if (!users) {
      res.status(400).json({ message: "error in retrieving user data" });
    }

     // Remove current user from the list of users to prevent seeing their own profile on the homepage
    for (let x=0;x<users.length;x+=1) {
      if (req.session.user_id === users[x].id) {
        users.splice(x, 1)
      }
    }
    // Render the homepage template with the retrieved user data
    res.render("homepage", {
      logged_in: req.session.logged_in,
      users
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
