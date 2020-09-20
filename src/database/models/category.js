'use strict';
module.exports = (sequelize, DataTypes) => 
{
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  }, {});

  Category.associate = function(models) {
    Category.belongsToMany(models.JobPost,
        {
            through: models.JobPostsCategoriesJoin,
            as: 'jobPosts',
            foreignKey: 'categoryId'
        });
  };

  return Category;
};