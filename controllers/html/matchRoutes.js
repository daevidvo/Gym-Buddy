const router = require("express").Router(); // import Router from express to handle routes
const { Matches, User } = require("../../models"); // import Matches and User models from the models folder
const withAuth = require("../../utils/auth"); // import the withAuth middleware from the utils folder
const { Op } = require("sequelize"); // import Op from sequelize to handle complex queries

router.get("/", withAuth, async (req, res) => {
  try {
    const userMatches = await Matches.findAll({ // find all matches that include the logged-in user
      where: {
        [Op.or]: [
          { user_id: req.session.user_id },
          { connect_id: req.session.user_id },
        ],
      },
      include: [
        {
          model: User, // include the User model in the query to get user details
          attributes: {
            exclude: ["password", "email"], // exclude sensitive attributes from the user details
          },
        },
      ],
    });

    const matchData = JSON.parse(JSON.stringify(userMatches, null, 2)); // convert the data to JSON format

    for (let x = 0; x < matchData.length; x += 1) { // iterate through the matches and remove the current user's match
      if (req.session.user_id == matchData[x].user_id) {
        matchData.splice(x, 1);
        // must do x-=1 because we're changing the length of matchData
        x -= 1;
      }
    }

    res.render("matches", { logged_in: true, matchData }); // render the matches page with the matchData
  } catch (err) {
    res.status(500).json(err); // handle any errors that occur during the retrieval of matches
  }
});

router.get("/:id", async (req, res) => {
  try {
    const matchData = await Matches.findOne({where: {id: req.params.id}}) // find the match with the given id
    const match = matchData.get({plain: true}) // get the match data in plain format

    const user1Data = await User.findByPk(match.user_id, { // find the first user in the match
        attributes: {
            exclude: ['email', 'password'] // exclude sensitive attributes from the user details
        }
    })
    const user1 = user1Data.get({plain: true})
    
    const user2Data = await User.findByPk(match.connect_id, { // find the second user in the match
        attributes: {
            exclude: ['email', 'password']
        }
    })
    const user2 = user2Data.get({plain: true}) // get the second user data in plain format

    res.render("messages", { // render the messages page with the user1 and user2 details
        user2: user2.userName,
        user1: user1.userName,
        logged_in: req.session.logged_in
    }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
