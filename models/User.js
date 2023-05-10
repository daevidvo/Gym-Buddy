// Import required modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define User model
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
  // Define User fields and validations
User.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        userName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [2],
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [8],
          },
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [50,260], // bio must be between 50 and 260 characters long
            },
        },
        training_goals: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10,75], // training goals must be between 10 and 75 characters long
            },
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 18,   // age must be at least 18
            },
        }
    },
    {
       // Define hooks to hash password before creating/updating user
        hooks: {
            beforeCreate: async (newUserData) => {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            },
          },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
    }
);

// Export User model
module.exports = User;
