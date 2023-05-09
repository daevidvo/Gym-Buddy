// modules and imports
const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const messageRoutes = require('./messageRoutes.js')
const matchRoute = require('./matchRoutes.js')

// middlware
router.use('/users', userRoutes)
router.use('/message', messageRoutes)
router.use('/match', matchRoute)

// exported to be used in ../controllers/index.js
module.exports = router