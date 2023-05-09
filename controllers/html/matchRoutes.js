const router = require("express").Router();
const { User, Messages, Matches } = require("../../models");
const withAuth = require("../../utils/auth.js");

router.get('/', withAuth, (req, res) => {
    
})

module.exports = router