const router = require("express").Router();
const { User, Messages, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.get("/", withAuth, async (req, res) => {
    try {
      // Get all messages between the current user and another user
      const userMessages = await Messages.findAll({
        where: {
          [Op.or]: [
            {
              user1Id: req.session.user_id,
              user2Id: req.body.user2Id,
            },
            {
              user2Id: req.body.user2Id,
              user1Id: req.session.user_id,
            },
          ],
        },
        include: [
          {
            model: User,
            as: "user1",
          },
          {
            model: User,
            as: "user2",
          },
        ],
        // order the messages based on when they were created
        order: [["createdAt", "ASC"]],
      });
  
      // Render the messages page and pass the messages to it
      res.render("messages", { userMessages });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router