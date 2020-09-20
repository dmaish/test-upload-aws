'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobPostsCategoriesJoin = sequelize.define('JobPostsCategoriesJoin', {
    jobPostId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  JobPostsCategoriesJoin.associate = function(models) {
    // associations can be defined here
  };
  return JobPostsCategoriesJoin;
};