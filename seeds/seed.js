// Import dependencies and models
const sequelize = require('../config/connection.js')
const {User, Matches} = require('../models')
const userData = require('./user.json')
const matchData = require('./matches.json')
// Define the function to seed the database
const seedData = async () => {
    // Synchronize with the database and force a reset
    await sequelize.sync({force: true})

    console.log('===========SEEDING USERS===========')

    // Create new user data in the database using the user model and the user data from JSON file
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })

    console.log('===========SEEDING MATCHES===========')
    // Create new match data in the database using the match model and the match data from JSON file
    const matches = await Matches.bulkCreate(matchData, {
    })

    // Exit the process when done
    process.exit(0);
}
// Call the function to seed the database
seedData();

