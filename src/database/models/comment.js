'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING(1000),
    deleted: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
  },
    edited: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.JobPost, {
      foreignKey: 'jobPostId',
  });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
  });
    Comment.belongsTo(models.Comment, {
        foreignKey: 'commentId',
        as: 'comments'
    })
    Comment.hasMany(models.Comment,
      {
        foreignKey: 'commentId',
      })
  };
  return Comment;
};