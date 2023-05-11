const router = require("express").Router();
const { Matches, User, Messages } = require("../../models");
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

    console.log(matchData)

    for(let x=0;x<matchData.length;x+=1) {
        if(req.session.user_id == matchData[x].user_id) {
            matchData.splice(x, 1)
            // must do x-=1 because we're changing the length of matchData
            x-=1
        }
    }

    res.render("matches", { logged_in: true, matchData });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
    try {
        const messageData = await Messages.findAll({where: {match_id: req.params.id}})

        const messages = JSON.parse(JSON.stringify(messageData))

        const user2Data = await User.findByPk(messages[0].user2Id, {
            attributes: {
                exclude: ['password', 'email']
            }
        })

        const user1Data = await User.findByPk(messages[0].user1Id, {
            attributes: {
                exclude: ['password', 'email']
            }
        })


        const user2 = JSON.parse(JSON.stringify(user2Data))
        const user1 = JSON.parse(JSON.stringify(user1Data))

        res.render('messages', {
            messages,
            user2: user2.userName,
            user1: user1.userName,
            matchID: req.params.id
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
