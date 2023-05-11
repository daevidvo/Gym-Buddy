// Import required modules
const User = require('./User');
const Matches = require('./Matches');

// User associations
User.hasMany(Matches, {
  onDelete: 'CASCADE',
});

// Matches associations
Matches.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = {User, Matches};
