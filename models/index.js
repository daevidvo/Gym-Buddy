// Import required modules
const User = require('./User');
const Messages = require('./Messages');
const Matches = require('./Matches');

// User associations
User.hasMany(Matches, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Messages, {
  foreignKey: 'user1_id',
  as: 'sent_messages',
});

User.hasMany(Messages, {
  foreignKey: 'user2_id',
  as: 'received_messages',
});

// Matches associations
Matches.belongsTo(User, {
  foreignKey: 'user_id',
});

// Messages associations
Messages.belongsTo(User, {
  foreignKey: 'user1_id',
  as: 'sender',
});

Messages.belongsTo(User, {
  foreignKey: 'user2_id',
  as: 'recipient',
});

module.exports = {User, Matches, Messages};
