// Import required modules
const User = require('./User');
const Messages = require('./Messages');
const Matches = require('./Matches');
const UserMessages = require ('./UserMessages');

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

User.hasMany(UserMessages, {
  foreignKey: 'user1Id',
  as: 'sent_user_messages',
});
  
User.hasMany(UserMessages, {
  foreignKey: 'user2Id',
  as: 'received_user_messages',
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

Messages.hasMany(UserMessages, {
  foreignKey: 'message_id',
  as: 'user_messages',
});

// UserMessages associations
UserMessages.belongsTo(User, {
  foreignKey: 'user1Id',
  as: 'sender',
});

UserMessages.belongsTo(User, {
  foreignKey: 'user2Id',
  as: 'recipient',
});

UserMessages.belongsTo(Messages, {
  foreignKey: 'message_id',
  as: 'message',
});

module.exports = {User, Matches, Messages, UserMessages};
