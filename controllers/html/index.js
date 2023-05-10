// modules and imports
const router = require("express").Router();
const messageRoutes = require("./messageRoutes.js");
const matchRoutes = require("./matchRoutes.js");
const profileRoutes = require("./profileRoutes.js");
const testRoute = require('./testRoute.js')
const { User, Messages, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

// middlware
router.use("/profile", profileRoutes);
router.use("/message", messageRoutes);
router.use("/matches", matchRoutes);
router.use('/test', testRoute)

// home route
router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { include: ["userName", "age", "bio"] },
    });

    const user = userData.map((data) => data.get({ plain: true }));

    if (!user) {
      res.status(400).json({ message: "error in retrieving user data" });
    }

    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
