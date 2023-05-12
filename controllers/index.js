// Importing required modules
const router = require('express').Router();

const apiRoutes = require('./api'); // Importing API routes
const htmlRoutes = require('./html'); // Importing HTML routes

// Setting up API and HTML routes using middleware
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;