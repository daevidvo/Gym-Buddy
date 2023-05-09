// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Matches = require('./Matches');
const User = require('./User');

class Messages extends Model {} // Define the Messages model

// Define the Messages attributes
Messages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: [150],
            },
        },
        user1Id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        user2Id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        created_at: {
           type: DataTypes.DATE,
           allowNull: false,
           defaultValue: DataTypes.NOW,
        },
        updated_at: {
           type: DataTypes.DATE,
           allowNull: false,
           defaultValue: DataTypes.NOW,
        },
        
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Messages',
    }
);

// Export the Messages model
module.exports = Messages;