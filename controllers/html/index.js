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

    res.render("homepage", {
      logged_in: req.session.logged_in,
      users
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
