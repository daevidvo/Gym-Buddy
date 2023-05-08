const User = require('./User');
const Messages = require('./Messages');
const Matches = require('./Matches');

User.hasMany(Matches, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });