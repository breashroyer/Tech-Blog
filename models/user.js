const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // Add bcrypt import
const sequelize = require('../config/connection'); // Adjust the path as necessary

class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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
      len: [8], // Passwords must be at least 8 characters long
    },
  },
}, {
  hooks: {
    // Before a User is created, automatically hash their password
    async beforeCreate(newUser) {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return newUser;
    },
  },
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'user',
});

module.exports = User;

