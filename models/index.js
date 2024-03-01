const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users can have many Posts
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Posts belong to Users
Post.belongsTo(User, {
  foreignKey: 'userId'
});

// Users can have many Comments
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Comments belong to Users
Comment.belongsTo(User, {
  foreignKey: 'userId'
});

// Posts can have many Comments
Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Comments belong to Posts
Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

module.exports = { User, Post, Comment };
