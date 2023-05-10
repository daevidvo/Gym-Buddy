const router = require("express").Router();
const { Matches, User } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");

router.get("/", withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    const userMatches = await Matches.findAll({
      where: {
        [Op.or]: [
          { user_id: req.session.user_id },
          { connect_id: req.session.user_id },
        ],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "email"],
          }
        },
      ]
    });

    const matchData = JSON.parse(JSON.stringify(userMatches, null, 2));

    for(let x=0;x<matchData.length;x+=1) {
        if(req.session.user_id === matchData[x].user_id) {
            matchData.splice(x, 1)
        }
    }

    console.log(matchData)

    res.render("matches", { logged_in: true, matchData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
