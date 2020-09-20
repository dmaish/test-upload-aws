'use strict';
module.exports = (sequelize, DataTypes) => 
{
  const JobPost = sequelize.define('JobPost', {
    objective: DataTypes.STRING(1000),
    toggleObjective: DataTypes.STRING(1000),
    visibility: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    savePartially: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    projectUsers: {
      type: DataTypes.STRING(100000),
    },
    aestheticSketches: { 
      type: DataTypes.STRING(100000),
      get: function() {
          if (this.getDataValue('aestheticSketches')) {
            return JSON.parse(this.getDataValue('aestheticSketches'));

          } else {
            null
          }
      }, 
      set: function(val) {
          return this.setDataValue('aestheticSketches', JSON.stringify(val));
        }
    },
    dimensionalSketches: { 
        type: DataTypes.STRING(100000),
        get: function() {
          if (this.getDataValue('dimensionalSketches')) {
            return JSON.parse(this.getDataValue('dimensionalSketches'));

          } else {
            null
          }
        }, 
        set: function(val) {
            return this.setDataValue('dimensionalSketches', JSON.stringify(val));
        }
    },
    prefferedMaterials: {
      type: DataTypes.STRING(100000),
    },
    projectUsers: { 
        type: DataTypes.STRING(100000),
        get: function() {
          if (this.getDataValue('projectUsers')) {
            return JSON.parse(this.getDataValue('projectUsers'));

          } else {
            null
          }
        }, 
    },
    projectKeyFeatures: { 
      type: DataTypes.STRING(100000),
        get: function() {
          if (this.getDataValue('projectKeyFeatures')) {
            return JSON.parse(this.getDataValue('projectKeyFeatures'));

          } else {
            null
          } 
        }, 
    },
    metricsOfSuccess: { 
      type: DataTypes.STRING(100000),
      get: function() {
        if (this.getDataValue('metricsOfSuccess')) {
          return JSON.parse(this.getDataValue('metricsOfSuccess'));

        } else {
          null
        } 
      }, 
  }, 
  milestones: { 
    type: DataTypes.STRING(100000),
    get: function() {
      if (this.getDataValue('milestones')) {
        return JSON.parse(this.getDataValue('milestones'));

      } else {
        null
      } 
    }, 
  },  
    targetMSRP: DataTypes.STRING,
    volume: DataTypes.STRING,
    budget: DataTypes.INTEGER,
    published: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    }
  },{});

  JobPost.associate = function(models) {
      JobPost.belongsTo(models.User, {
          foreignKey: 'userId',
      });

      JobPost.belongsToMany(models.Category,{
            through: models.JobPostsCategoriesJoin,
            as: 'categories',
            foreignKey: 'jobPostId'
        });

      JobPost.hasMany(models.Comment, {
        foreignKey: 'jobPostId',
        as: 'comments'
    });
    JobPost.hasMany(models.Bid, {
      foreignKey: 'jobPostId',
      as: 'bids'
  });
  };

  return JobPost;
};