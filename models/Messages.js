const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Messages extends Model {}

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
        user1: {

        },
        user2: {

        },
    },
)