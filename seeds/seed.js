const sequelize = require('../config/connection.js')
const {User, Matches} = require('../models')
const userData = require('./user.json')
const matchData = require('./matches.json')

const seedData = async () => {
    await sequelize.sync({force: true})

    console.log('===========SEEDING USERS===========')

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })

    console.log('===========SEEDING MATCHES===========')
    const matches = await Matches.bulkCreate(matchData, {
    })

    process.exit(0);
}

seedData();

