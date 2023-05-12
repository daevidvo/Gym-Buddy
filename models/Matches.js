// Import required modules
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User'); 


class Matches extends Model {} // Define the Matches model

Matches.init( // Define the model attributes
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        connect_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            },
        },
        created_at: { //Date stamp for new matches
           type: DataTypes.DATE,
           allowNull: false,
           defaultValue: DataTypes.NOW,
        },
    },
    {
        
        sequelize, // Pass the sequelize connection to the Matches model
        freezeTableName: true, // Set the table name to match the model name
        underscored: true, // Use underscores instead of camelCase in column names
        modelName: 'Matches', // Set the model name
    }
);

module.exports = Matches; // Export the Matches model
