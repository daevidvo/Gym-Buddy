// modules and imports
const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const messageRoutes = require('./messageRoutes.js')

// middlware
router.use('/users', userRoutes)
router.use('/profile', messageRoutes)

// exported to be used in ../controllers/index.js
module.exports = router