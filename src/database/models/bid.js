'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bid = sequelize.define('Bid', {
    type: DataTypes.INTEGER,
    note: DataTypes.STRING,
    status: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  }, {});
  Bid.associate = function(models) {
    Bid.belongsTo(models.User, {
      foreignKey: 'userId',
  });
  Bid.belongsTo(models.JobPost, {
    foreignKey: 'jobPostId',
});
  };
  return Bid;
};