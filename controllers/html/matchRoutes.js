const router = require("express").Router();
const { Matches, User, Messages } = require("../../models");
const withAuth = require("../../utils/auth");
const { Op } = require("sequelize");

router.get("/", withAuth, async (req, res) => {
  try {
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
          },
        },
      ],
    });

    const matchData = JSON.parse(JSON.stringify(userMatches, null, 2));

    for (let x = 0; x < matchData.length; x += 1) {
      if (req.session.user_id == matchData[x].user_id) {
        matchData.splice(x, 1);
        // must do x-=1 because we're changing the length of matchData
        x -= 1;
      }
    }

    res.render("matches", { logged_in: true, matchData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const matchData = await Matches.findOne({where: {id: req.params.id}})
    const match = matchData.get({plain: true})

    const user1Data = await User.findByPk(match.user_id, {
        attributes: {
            exclude: ['email', 'password']
        }
    })
    const user1 = user1Data.get({plain: true})
    
    const user2Data = await User.findByPk(match.connect_id, {
        attributes: {
            exclude: ['email', 'password']
        }
    })
    const user2 = user2Data.get({plain: true})

    res.render("messages", {
        user2: user2.userName,
        user1: user1.userName
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
