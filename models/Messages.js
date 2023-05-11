// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Matches = require('./Matches');
const User = require('./User');

class Messages extends Model {} // Define the Messages model


// REMOVE MESSAGES

// Define the Messages attributes
Messages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: [150],
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
        match_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Matches,
                key: 'id',
            },
        },
    },
    {
        
        sequelize, // Pass the sequelize connection to the Matches model
        freezeTableName: true, // Set the table name to match the model name
        underscored: true, // Use underscores instead of camelCase in column names
        modelName: 'Messages', // Set the model name
    }
);

module.exports = Messages; // Export the Messages model