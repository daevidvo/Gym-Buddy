// modules and imports
const router = require('express').Router()
const userRoutes = require('./userRoutes.js')
const profileRoutes = require('./profileRoutes')

// middlware
router.use('/users', userRoutes)
router.use('/profile', profileRoutes)

// exported to be used in ../controllers/index.js
module.exports = router