'use strict';
module.exports = (sequelize, DataTypes) => 
{
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nationality: DataTypes.STRING,
    tagline: DataTypes.STRING,
    company: DataTypes.STRING,
    city: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN, 
      defaultValue: true
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.JobPost, {
        foreignKey: 'userId',
        as: 'jobPosts'
    });

    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments'
  });
  User.hasMany(models.Bid, {
    foreignKey: 'userId',
    as: 'bids'
});
  };
  return User;
};