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
    
    const userData = await User.findAll({
      attributes: { exclude: ["email", "password"] },
    });

    const users = userData.map((data) => data.get({ plain: true }));

    if (!users) {
      res.status(400).json({ message: "error in retrieving user data" });
    }

    // stops the user from seeing their own profile in the homepage
    for (let x=0;x<users.length;x+=1) {
      if (req.session.user_id === users[x].id) {
        users.splice(x, 1)
      }
    }

    res.render("homepage", {
      logged_in: req.session.logged_in,
      users
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
