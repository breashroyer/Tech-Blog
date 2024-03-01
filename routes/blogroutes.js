// models/Post.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
  // Define model attributes
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // Add other necessary fields
}, {
  sequelize,
  modelName: 'post',
  // Other model options
});

module.exports = Post;

// models/Comment.js
class Comment extends Model {}

Comment.init({
  // Define model attributes
  // Similar structure to Post model, with a reference to the Post it belongs to
}, {
  sequelize,
  modelName: 'comment',
  // Other model options
});

module.exports = Comment;

